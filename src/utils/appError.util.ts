import HttpStatusCodes from "@src/constants/httpStatusCodes";
import { appError } from "@src/utils/interfaces/app/app.interface";

class AppError extends Error implements appError {
  statusCode: HttpStatusCodes;
  errorData?: object;

  constructor(
    message: string,
    statusCode: HttpStatusCodes,
    errorData?: object
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorData = errorData;
  }
}

export default AppError;
