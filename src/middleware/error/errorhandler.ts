/* eslint-disable no-unused-vars */
import log from "@config/winston";
import AppError from "@src/utils/appError.util";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const { NODE_ENV } = process.env;

const sendErrDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    server: {
      status: false,
      message: err.message,
    },
    ...err.errorData,
  });
  log.error(err.errorData);
};

const sendErrProd = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    server: {
      status: false,
      message:
        "Sorry a technical error occured. Our team have been notified and we are working on it.",
    },
  });
  log.error(err.message);
};

export default (
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next?: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;

  if (NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "JsonWebTokenError")
      error = new AppError("Invalid token please login again", 400);
    if (error.name === "TokenExpiredError")
      error = new AppError("Token has expired please login again", 400);

    sendErrProd(error, res);
  } else if (NODE_ENV === "development") {
    sendErrDev(err, res);
  }
};
