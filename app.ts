// Dada Ki Jay Ho

import express from "express";
import { config } from "dotenv";
config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}...`);
});
