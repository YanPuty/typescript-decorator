import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';

import { Controller } from '../../decorators/controller';
import { GET } from '../../decorators/methods';

@Controller('/users')
export class UserController {

  @GET('/v1/list')
  getAllUser(_R: Request, response: Response, _N: NextFunction) {
    response.send('Hello world!');
  }
}