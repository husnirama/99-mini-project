import { redis } from "./redis.js";
function stableSerialize(value) {
    if (value === null || value === undefined) {
        return "";
    }
    if (Array.isArray(value)) {
        return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
    }
    if (typeof value === "object") {
        const objectValue = value;
        const sortedKeys = Object.keys(objectValue).sort();
        return `{${sortedKeys
            .map((key) => `${key}:${stableSerialize(objectValue[key])}`)
            .join(",")}}`;
    }
    return String(value);
}
function getActorScope(req) {
    if (req.user?.userId) {
        return `user:${req.user.userId}`;
    }
    return "public";
}
function getTagKey(tag) {
    return `cache:tag:${tag}`;
}
function buildRequestCacheKey(req, namespace) {
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
async function registerTags(cacheKey, tags, ttlSeconds) {
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
export function createGetCacheMiddleware(options) {
    return async (req, res, next) => {
        if (req.method !== "GET") {
            next();
            return;
        }
        const cacheKey = buildRequestCacheKey(req, options.namespace);
        try {
            const cachedValue = await redis.get(cacheKey);
            if (cachedValue) {
                res.status(200).json(JSON.parse(cachedValue));
                return;
            }
        }
        catch (error) {
            console.error("Cache read failed:", error);
        }
        const originalJson = res.json.bind(res);
        res.json = ((body) => {
            void (async () => {
                try {
                    const shouldCache = options.shouldCache
                        ? options.shouldCache(req, res, body)
                        : res.statusCode >= 200 && res.statusCode < 300;
                    if (!shouldCache) {
                        return;
                    }
                    const uniqueTags = Array.from(new Set(options.tags(req))).filter(Boolean);
                    await redis.set(cacheKey, JSON.stringify(body), "EX", options.ttlSeconds);
                    await registerTags(cacheKey, uniqueTags, options.ttlSeconds);
                }
                catch (error) {
                    console.error("Cache write failed:", error);
                }
            })();
            return originalJson(body);
        });
        next();
    };
}
export async function invalidateCacheTags(tags) {
    const uniqueTags = Array.from(new Set(tags)).filter(Boolean);
    if (!uniqueTags.length) {
        return;
    }
    try {
        const tagKeys = uniqueTags.map((tag) => getTagKey(tag));
        const taggedKeys = await Promise.all(tagKeys.map((tagKey) => redis.smembers(tagKey)));
        const cacheKeys = Array.from(new Set(taggedKeys.flat())).filter(Boolean);
        const pipeline = redis.multi();
        if (cacheKeys.length) {
            pipeline.del(...cacheKeys);
        }
        if (tagKeys.length) {
            pipeline.del(...tagKeys);
        }
        await pipeline.exec();
    }
    catch (error) {
        console.error("Cache invalidation failed:", error);
    }
}
export const cacheTags = {
    status: "status",
    eventsList: "events:list",
    event: (eventId) => `event:${eventId}`,
    authMe: (userId) => `auth:me:user:${userId}`,
    organizerScope: (userId) => `organizer:user:${userId}`,
    organizerDashboard: (userId) => `organizer:dashboard:user:${userId}`,
    organizerProfile: (userId) => `organizer:profile:user:${userId}`,
    transactionsUser: (userId) => `transactions:user:${userId}`,
    transactionsOrganizer: (userId) => `transactions:organizer:${userId}`,
    transaction: (transactionId) => `transaction:${transactionId}`,
};
//# sourceMappingURL=cache.js.map