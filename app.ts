// Dada Ki Jay Ho

import express from "express";
import expressSession from "express-session";
import { config } from "dotenv";
config();

import publicRoutes from "./routes/public";
import { redisSessionStore } from "./config/redisConfig";
import { AppDataSource } from "./data-source";

const app = express();

app.use(
  expressSession({
    name: "node-js-app-session-name",
    secret: process.env.SESSION_SECRET!,
    store: redisSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(publicRoutes);

app.listen(process.env.PORT, () => {
  AppDataSource.initialize().then((value) => {
    console.log("Database is ready to rock ...");
  });
  console.log(`App is listening on port ${process.env.PORT}...`);
});
