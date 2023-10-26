"use strict";
// Dada Ki Jay Ho
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSessionStore = void 0;
const ioredis_1 = require("ioredis");
const connect_redis_1 = __importDefault(require("connect-redis"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redisClient = new ioredis_1.Redis(Number.parseInt(process.env.REDIS_PORT || "6379"), process.env.REDIS_HOST || "localhost", {
    password: "root",
});
exports.redisSessionStore = new connect_redis_1.default({
    client: redisClient,
    prefix: "my-NodeJs-app-redis-store:",
    ttl: Number.parseInt(process.env.REDIX_TTL_SECONDS || "5"),
});
