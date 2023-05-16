import { Request, Response, NextFunction } from "express";
import AppError from "@utils/appError.util";
import HttpStatusCodes from "@src/constants/httpStatusCodes";
import AppSession from "@utils/session.util";
import { IUser } from "@src/utils/interfaces/users.interface";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED);
    }

    const token = authorizationHeader.split(" ")[1];

    const sessionData = AppSession.decode<IUser>(token);

    if (sessionData) {
      // Assign the user object to the request
      req.user = sessionData;
      next();
    } else {
      // Handle unauthorized access
      throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED);
    }
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
