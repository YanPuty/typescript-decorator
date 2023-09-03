import { Controller, GET } from '../../common';

@Controller('/users')
export class UserController {

  @GET('/v1/list')
  getAllUser() {
    return 'Hello world!';
  }
}