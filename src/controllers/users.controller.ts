import User from "@models/user.model";
import HttpStatusCodes from "@src/constants/httpStatusCodes";
import AppError from "@utils/appError.util";
import { ILoginReq, IRegisterReq } from "@utils/interfaces/users.interface";
import HttpResponse from "@utils/http.util";
import { NextFunction, Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import envVars from "@config/envVars";
import AppSession from "@src/utils/session.util";

class UserController {
  http: HttpResponse;

  constructor() {
    this.http = new HttpResponse();
  }

  /**
   * register User
   * @param req
   * @param res
   * @param next
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IRegisterReq = req.body;
      const userExists = await User.find({ email: data.email });

      if (userExists)
        throw new AppError("Email already exists ", HttpStatusCodes.CONFLICT);

      const salt = await genSalt(Number(envVars.Passwords.saltRounds));
      const hashedPassword = await hash(data.password, salt);

      data.password = hashedPassword;

      const registeredUser = await User.create(data);

      this.http.sendSuccess(
        res,
        HttpStatusCodes.CREATED,
        "Successfully registered your account",
        registeredUser
      );
    } catch (error) {
      this.http.sendError(next, "Unable to register your account", error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ILoginReq = req.body;

      const user = await User.findOne({ email: data.email });

      if (!user)
        throw new AppError("Invalid credentials", HttpStatusCodes.NOT_FOUND);

      const passwordValid = await compare(data.password, user.password);

      if (!passwordValid)
        throw new AppError("Wrong credentials", HttpStatusCodes.UNAUTHORIZED);

      await AppSession.addSessionData(res, user);

      this.http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Successfully logged you in"
      );
    } catch (error) {
      this.http.sendError(next, "Unable to log you in", error);
    }
  }

  logout(req: Request, res: Response, next: NextFunction) {
    try {
      AppSession.clearCookie(res);

      return this.http.sendSuccess(
        res,
        HttpStatusCodes.OK,
        "Successfully logged you out"
      );
    } catch (error) {
      this.http.sendError(next, "Unable to log you in", error);
    }
  }
}

export default UserController;
