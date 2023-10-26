// Dada Ki Jay Ho

import { Router } from "express";
import * as publicController from "../controllers/user";

const router = Router();

router.post("/signup", publicController.signup);
router.post("/login", publicController.login);

export default router;
