import type { NextFunction, Request, Response } from "express";
import { redis } from "./redis.js";

type CacheOptions = {
  namespace: string;
  ttlSeconds: number;
  tags: (req: Request) => string[];
  shouldCache?: (req: Request, res: Response, body: unknown) => boolean;
};

function stableSerialize(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
  }

  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    const sortedKeys = Object.keys(objectValue).sort();
    return `{${sortedKeys
      .map((key) => `${key}:${stableSerialize(objectValue[key])}`)
      .join(",")}}`;
  }
  return String(value);
}

function getActorScope(req: Request) {
  if (req.user?.userId) {
    return `user:${req.user.userId}`;
  }

  return "public";
}

function getTagKey(tag: string) {
  return `cache:tag:${tag}`;
}

function buildRequestCacheKey(req: Request, namespace: string) {
  return [
    "cache",
    namespace,
    getActorScope(req),
    req.baseUrl,
    req.path,
    stableSerialize(req.params),
    stableSerialize(req.query),
  ].join(":");
}

async function registerTags(
  cacheKey: string,
  tags: string[],
  ttlSeconds: number,
) {
  if (!tags.length) {
    return;
  }

  const pipeline = redis.multi();

  tags.forEach((tag) => {
    pipeline.sadd(getTagKey(tag), cacheKey);
    pipeline.expire(getTagKey(tag), ttlSeconds);
  });

  await pipeline.exec();
}

export function createGetCacheMiddleware(options: CacheOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      next();
      return;
    }

    const cacheKey = buildRequestCacheKey(req, options.namespace);

    try {
      const cachedValue = await redis.get(cacheKey);

      if (cachedValue) {
        const parsedValue = JSON.parse(cachedValue);
        res.status(200).json({
          ...parsedValue,
          source: "cache",
        });
        return;
      }
    } catch (error) {
      console.error("Cache read failed:", error);
    }

    const originalJson = res.json.bind(res);

    res.json = ((body: unknown) => {
      void (async () => {
        try {
          const shouldCache = options.shouldCache
            ? options.shouldCache(req, res, body)
            : res.statusCode >= 200 && res.statusCode < 300;

          if (!shouldCache) {
            return;
          }

          const uniqueTags = Array.from(new Set(options.tags(req))).filter(
            Boolean,
          );

          await redis.set(
            cacheKey,
            JSON.stringify(body),
            "EX",
            options.ttlSeconds,
          );
          await registerTags(cacheKey, uniqueTags, options.ttlSeconds);
        } catch (error) {
          console.error("Cache write failed:", error);
        }
      })();

      return originalJson(body);
    }) as typeof res.json;

    next();
  };
}

export async function invalidateCacheTags(tags: string[]) {
  const uniqueTags = Array.from(new Set(tags)).filter(Boolean);

  if (!uniqueTags.length) {
    return;
  }

  try {
    const tagKeys = uniqueTags.map((tag) => getTagKey(tag));
    const taggedKeys = await Promise.all(
      tagKeys.map((tagKey) => redis.smembers(tagKey)),
    );
    const cacheKeys = Array.from(new Set(taggedKeys.flat())).filter(Boolean);
    const pipeline = redis.multi();

    if (cacheKeys.length) {
      pipeline.del(...cacheKeys);
    }

    if (tagKeys.length) {
      pipeline.del(...tagKeys);
    }

    await pipeline.exec();
  } catch (error) {
    console.error("Cache invalidation failed:", error);
  }
}

export const cacheTags = {
  status: "status",
  eventsList: "events:list",
  event: (eventId: number) => `event:${eventId}`,
  authMe: (userId: number) => `auth:me:user:${userId}`,
  organizerScope: (userId: number) => `organizer:user:${userId}`,
  organizerDashboard: (userId: number) => `organizer:dashboard:user:${userId}`,
  organizerProfile: (userId: number) => `organizer:profile:user:${userId}`,
  transactionsUser: (userId: number) => `transactions:user:${userId}`,
  transactionsOrganizer: (userId: number) => `transactions:organizer:${userId}`,
  transaction: (transactionId: number) => `transaction:${transactionId}`,
  customerScope: (userId: number) => `customer:user:${userId}`,
  customerProfile: (userId: number) => `customer:profile:user:${userId}`,
  customerPoints: (userId: number) => `customer:points:user:${userId}`,
  customerTickets: (userId: number) => `customer:tickets:user:${userId}`,
  customerReviews: (userId: number) => `customer:reviews:user:${userId}`,
};
