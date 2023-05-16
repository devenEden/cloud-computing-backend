import Blog from "@models/blogs.model";
import HttpStatusCodes from "@src/constants/httpStatusCodes";
import { IBlog } from "@src/utils/interfaces/blog.interface";
import HttpResponse from "@utils/http.util";
import { NextFunction, Request, Response } from "express";

const http = new HttpResponse();

class BlogController {
  async getBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await Blog.find();

      http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Yaay 😃 We've Successfully loaded everything",
        { blogs }
      );
    } catch (error) {
      http.sendError(next, "Oh no 😥. We're unable to load the posts", error);
    }
  }

  async getBlogDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id);

      http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Hooray 😁!  We've Successfully The one you selected",
        { blog }
      );
    } catch (error) {
      http.sendError(next, "Oh no 😓. We're unable to load the posts", error);
    }
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      // const sessionUser: IUser = req.user as IUser;
      const data: IBlog = req.body;

      // let user;

      // if (sessionUser) user = await User.findById(sessionUser._id);

      // if (user) data.userId = user._id;
      // else
      //   throw new AppError(
      //     "Hmm..... You seem not to be a user in our app 🤨. Please register",
      //     HttpStatusCodes.UNAUTHORIZED
      //   );

      const blog = await Blog.create(data);

      http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Hooray 😁!  We've Successfully created this",
        { blog }
      );
    } catch (error) {
      http.sendError(next, "Oh no 😓. We're unable to load the posts", error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IBlog = req.body;

      const blog = await Blog.updateOne(data);

      http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Yup 😆! Those changes are now steady and updated",
        { blog }
      );
    } catch (error) {
      http.sendError(next, "Oh no 😓. We're unable to update the posts", error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const blog = await Blog.deleteOne({ _id: id });

      http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Haha 😂! Okay you didn't want us to keep it. Fine Its been removed",
        { blog }
      );
    } catch (error) {
      http.sendError(next, "Oh no 😓. We're unable to update the posts", error);
    }
  }
}

export default BlogController;
