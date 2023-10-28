// Dada Ki Jay Ho

import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { CreateUserDto } from "../dto/user";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export const signup = async (req: Request, res: Response) => {
  // get data from req.body
  const user: CreateUserDto = req.body as CreateUserDto;
  // check if user exists with given email or not
  if (
    await AppDataSource.manager
      .getRepository(User)
      .findOneBy({ email: user.email })
  )
    throw new Error("User with this email aleady exists");

  // create newUser
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  user.salt = salt;

  // save data
  const result = await AppDataSource.manager.getRepository(User).save(user);
  if (!result)
    return res.status(500).send({
      status: "fail",
      message: "something went wrong while creating user",
      data: null,
    });

  // generate the session and store it
  req.session.userId = result.id;

  return res.status(201).send({
    status: "success",
    message: "user signup successfull",
    data: result,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // check if user exists or not
  const user = await AppDataSource.getRepository(User).findOneBy({ email });
  if (!user)
    return res.status(404).send({
      status: "fail",
      message: "user does not found with this email",
      data: null,
    });

  // check if password matches or not
  if ((await bcrypt.compare(password, user.password)) === false)
    return res.status(404).send({
      status: "fail",
      message: "unauthorized access! credentials does not match!",
      data: null,
    });

  // store user id in session
  req.session.userId = user.id;

  // send response to user
  return res.status(200).send({
    status: "success",
    message: "user login successfull",
    data: user,
  });
};
