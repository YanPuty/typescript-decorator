import { HttpCode } from '../../enums/HttpCode';
import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message: string, errorCode?: number) {
    super("NOT_FOUND", HttpCode.NotFound, message, errorCode);
  }
}
