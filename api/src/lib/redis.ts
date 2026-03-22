import "dotenv/config";
import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL!;

export function createRedisConnection() {
  return new Redis(redisUrl, {
    maxRetriesPerRequest: null,
  });
}

export const redis = createRedisConnection();

redis.on("error", (error: unknown) => {
  console.error("Redis connection error:", error);
});
