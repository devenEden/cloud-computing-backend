// **** Variables **** //

import envVars from "@config/envVars";
import { Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import AppError from "./appError.util";
import HttpStatusCodes from "@src/constants/httpStatusCodes";

// Errors

// Options
const Options = {
  expiresIn: envVars.Jwt.Exp,
};

class AppSession {
  /**
   * Get session data from request object (i.e. ISessionUser)
   */
  // static getSessionData<T>(req: Request): Promise<string | T | undefined> {
  //   const { Key } = envVars.CookieProps,
  //     jwt = req.signedCookies[Key];

  //   return this.decode(jwt);
  // }

  static decode<T>(jwt: string): string | undefined | T {
    try {
      const decoded = jsonwebtoken.verify(jwt, envVars.Jwt.Secret) as T;

      return decoded;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param data
   * @returns
   */
  static sign(data: string | object | Buffer): Promise<string> {
    return new Promise((res, rej) => {
      jsonwebtoken.sign(data, envVars.Jwt.Secret, Options, (err, token) => {
        return err ? rej(err) : res(token || "");
      });
    });
  }

  /**
   * Add a JWT to the response
   */
  static async addSessionData(
    res: Response,
    data: string | object
  ): Promise<Response> {
    if (!res || !data) {
      throw new AppError("Invalid request", HttpStatusCodes.BAD_REQUEST);
    }
    // Setup JWT
    const jwt = await this.sign(data),
      { Key, Options } = envVars.CookieProps;
    // Return

    return res.cookie(Key, jwt, Options);
  }

  static clearCookie(res: Response): Response {
    const { Key, Options } = envVars.CookieProps;

    return res.clearCookie(Key, Options);
  }
}

export default AppSession;
