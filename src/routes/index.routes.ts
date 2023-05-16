/* eslint-disable @typescript-eslint/no-namespace */
import BlogController from "@controllers/blog.controler";
import UserController from "@controllers/users.controller";
import express from "express";

const indexRouter = express.Router();

const blogsController = new BlogController();
const userController = new UserController();

const prefix = "/api/v1";

indexRouter.post(`${prefix}/users/login`, userController.login);
indexRouter.post(`${prefix}/users/register`, userController.register);
indexRouter.get(`${prefix}/users/logout`, userController.logout);
indexRouter.get(`${prefix}/blogs/:id`, blogsController.getBlogDetails);
indexRouter.get(`${prefix}/blogs`, blogsController.getBlogs);
indexRouter.post(`${prefix}/blogs`, blogsController.createBlog);
indexRouter.put(`${prefix}/blogs/:id`, blogsController.updateBlog);
indexRouter.delete(`${prefix}/blogs`, blogsController.deleteBlog);

export default indexRouter;
