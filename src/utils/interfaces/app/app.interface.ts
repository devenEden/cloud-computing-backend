import HttpStatusCodes from "@src/constants/httpStatusCodes";
import express from "express";
export interface appError extends Error {
  statusCode: HttpStatusCodes;
  errorData?: object;
}

export interface ResponseData {
  [key: string]: unknown;
}

// **** Express **** //
export interface IReq<T = void> extends express.Request {
  body: T;
}

export interface IRes extends express.Response {
  sessionUser?: object;
}
