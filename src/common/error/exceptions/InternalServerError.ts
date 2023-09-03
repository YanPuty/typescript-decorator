import { HttpCode } from "../../enums/HttpCode";
import { HttpError } from "./HttpError";

export class InternalServerError extends HttpError {

  constructor(message: string, errorCode?: number) {
    super("INTERNAL_SERVER_ERROR", HttpCode.InternalServerError, message, errorCode);
  }

}
