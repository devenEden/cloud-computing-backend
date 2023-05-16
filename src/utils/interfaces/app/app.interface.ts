import HttpStatusCodes from "@src/constants/httpStatusCodes";
// import express, { NextFunction } from "express"
export interface appError extends Error {
  statusCode: HttpStatusCodes;
  errorData?: object;
}

export interface ResponseData {
  [key: string]: object;
}
