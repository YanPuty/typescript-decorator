import { HttpCode } from '../../enums/HttpCode';
import { HttpError } from './HttpError';

export class MissingParamError extends HttpError {

  constructor(param: string, errorCode?: number) {
    super("BAD_REQUEST", HttpCode.BadRequest, `Missing request param '${param}'`, errorCode);
  }

}
