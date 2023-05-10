import { IUser } from "@utils/interfaces/users.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
