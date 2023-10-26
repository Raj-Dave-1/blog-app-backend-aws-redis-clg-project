// Dada Ki Jay Ho

import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import { config } from "dotenv";
config();

const redisClient = new Redis(
  Number.parseInt(process.env.REDIS_PORT || "6379"),
  process.env.REDIS_HOST || "localhost",
  {
    password: "root",
  }
);

export const redisSessionStore = new RedisStore({
  client: redisClient,
  prefix: "my-NodeJs-app-redis-store:",
  ttl: undefined,
});
