// Dada Ki Jay Ho

import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  // get data from req.body
  // check if user exists with given email or not
  // save data
};

export const login = (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // check if user exists or not

  // check if password matches or not

  // store email in session

  // send response to user
};
