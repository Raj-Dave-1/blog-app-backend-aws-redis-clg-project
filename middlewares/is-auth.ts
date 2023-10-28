// Dada Ki Jay Ho

import { NextFunction, Request, Response } from "express";
import { redisClient } from "../config/redisConfig";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send({
      stauts: "fail",
      message: "Unathorized Access",
      data: null,
    });
  }

  // check if store contains the session with this userId or not
  const data = await redisClient.get(
    "blog_app_raj_dave_node_js:" + req.sessionID
  );

  if (!data) {
    return res.status(401).send({
      stauts: "fail",
      message: "Unathorized Access",
      data: null,
    });
  }

  next();
};
