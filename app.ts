// Dada Ki Jay Ho

import express from "express";
import expressSession from "express-session";
import { config } from "dotenv";
config();

import publicRoutes from "./routes/public";
import blogRoutes from "./routes/blog";
import { redisSessionStore } from "./config/redisConfig";
import { AppDataSource } from "./data-source";
import cookieParser from "cookie-parser";
import { isAuth } from "./middlewares/is-auth";

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
app.use(cookieParser());
app.use(express.json());
app.use(publicRoutes);
app.use(isAuth);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT, () => {
  AppDataSource.initialize().then((value) => {
    console.log("Database is ready to rock ...");
  });
  console.log(`App is listening on port ${process.env.PORT}...`);
});
