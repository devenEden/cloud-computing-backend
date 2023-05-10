import HttpStatusCodes from "@src/constants/httpStatusCodes";

export interface appError extends Error {
  statusCode: HttpStatusCodes;
  errorData?: object;
}

export interface ResponseData {
  [key: string]: unknown;
}
