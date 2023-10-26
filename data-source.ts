// Dada ki Jay Ho

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Blog } from "./entities/blog";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5434"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Blog],
  migrations: [],
  subscribers: [],
});
