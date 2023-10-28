// Dada Ki Jay Ho

import { Router } from "express";
import * as blogController from "../controllers/blog";

const router = Router();

router.get("/list");

router.get("/:blogId");

router.post("/", blogController.create);

router.patch("/:blogId");

router.delete("/:blogId");

export default router;
