"use strict";
// Dada Ki Jay Ho
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const data_source_1 = require("../data-source");
const blog_1 = require("../entities/blog");
const user_1 = require("../entities/user");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = req.body;
    const userId = req.session.userId;
    console.log("userId->", userId);
    if (!userId)
        return res.status(404).send({
            status: "fail",
            message: "unauthorised access",
            data: null,
        });
    const blogAuthor = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
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
    let newBlog = new blog_1.Blog();
    newBlog = Object.assign(Object.assign(Object.assign({}, newBlog), blog), { author: blogAuthor });
    const result = yield data_source_1.AppDataSource.getRepository(blog_1.Blog).save(newBlog);
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
});
exports.create = create;
