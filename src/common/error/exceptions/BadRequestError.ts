import { HttpCode } from "../../enums/HttpCode";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string, errorCode?: number, payload?: any) {
    super("BAD_REQUEST", HttpCode.BadRequest, message, errorCode, payload);
  }

}