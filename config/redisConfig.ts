// Dada Ki Jay Ho

import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import { config } from "dotenv";
config();

export const redisClient = new Redis(
  Number.parseInt(process.env.REDIS_PORT || "6379"),
  process.env.REDIS_HOST || "localhost",
  {
    password: "root",
  }
);

export const redisSessionStore = new RedisStore({
  client: redisClient,
  prefix: "blog_app_raj_dave_node_js:",
  ttl: Number.parseInt(process.env.REDIX_TTL_MINUTES || "1") * 60,
});
