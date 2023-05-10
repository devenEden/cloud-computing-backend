import HttpStatusCodes from "@src/constants/httpStatusCodes";
import { ResponseData } from "@src/interfaces/app/app.interface";
import { serverResponse } from "@src/types/app/app.types";
import { NextFunction, Response } from "express";
import AppError from "./appError.util";

class HttpResponse {
  statusCode: HttpStatusCodes;
  message: string | null;
  type: boolean;
  data: unknown[];
  response: serverResponse;
  downloadPath: string | null;

  constructor() {
    this.statusCode = HttpStatusCodes.OK;
    this.message = null;
    this.downloadPath = null;
    this.type = false;
    this.data = [];
    this.response = {
      server: {
        status: this.type,
        message: this.message,
      },
    };
  }

  /**
   * Set Success HTTP Response
   *
   * @param {BigInteger} statusCode Success Status Code
   * @param {String} message Success Message
   * @param {Array} data Nullable array of data to be attached to the success response
   */
  sendSuccess(
    res: Response,
    statusCode: HttpStatusCodes,
    message: string,
    data: ResponseData[] = []
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = true;
    this.data = data;

    return res.status(this.statusCode).json({
      ...this.response,
      ...this.data,
    });
  }

  /**
   * Set Error HTTP Response
   *
   * @param {String} statusCode Error status code
   * @param {String} message Error Message
   */
  sendError(
    next: NextFunction,
    statusCode: HttpStatusCodes,
    message: string,
    errorData: ResponseData[] = []
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = true;
    this.data = errorData;

    return next(new AppError(message, statusCode, errorData));
  }

  download(res: Response) {
    return res.download(this.downloadPath as string);
  }
}

export default HttpResponse;
