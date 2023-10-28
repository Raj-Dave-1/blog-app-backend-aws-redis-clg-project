// Dada Ki Jay Ho

import { Request, Response } from "express";
import { CreateBlogDto } from "../dto/blog";
import { AppDataSource } from "../data-source";
import { Blog } from "../entities/blog";
import { User } from "../entities/user";

export const create = async (req: Request, res: Response) => {
  const blog: CreateBlogDto = req.body as CreateBlogDto;

  const userId = req.session.userId;
  console.log("userId->", userId);

  if (!userId)
    return res.status(404).send({
      status: "fail",
      message: "unauthorised access",
      data: null,
    });

  const blogAuthor = await AppDataSource.getRepository(User).findOne({
    where: {
      id: userId,
    },
  });

  console.log(blogAuthor);

  if (!blogAuthor)
    return res.status(404).send({
      status: "fail",
      message: "author not found with given Id",
      data: null,
    });

  let newBlog = new Blog();
  newBlog = {
    ...newBlog,
    ...blog,
    author: blogAuthor,
  };

  const result = await AppDataSource.getRepository(Blog).save(newBlog);
  if (!result)
    return res.status(500).send({
      status: "fail",
      message: "something went wrong while creating blog",
      data: null,
    });

  return res.status(201).send({
    status: "success",
    message: "blog created successfully",
    data: result,
  });
};
