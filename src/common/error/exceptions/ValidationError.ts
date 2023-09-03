import { HttpCode } from "../../enums/HttpCode";
import { HttpError } from "./HttpError";

export class ValidationError extends HttpError {

  constructor(message: string, errorCode: number = 0) {
    super("VALIDATION_ERROR", HttpCode.ValidationError, message, errorCode);
  }

}
