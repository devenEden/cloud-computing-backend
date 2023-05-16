import { IBlog } from "@utils/interfaces/blog.interface";
import { Schema, model } from "mongoose";

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

const Blog = model<IBlog>("Blog", BlogSchema);

export default Blog;
