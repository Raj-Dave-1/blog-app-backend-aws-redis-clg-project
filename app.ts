// Dada Ki Jay Ho

import express from "express";
import { config } from "dotenv";
config();

import publicRoutes from "./routes/public";

const app = express();

app.use(publicRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}...`);
});
