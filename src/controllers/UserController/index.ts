import { Controller } from '../../decorators/controller';
import { GET } from '../../decorators/methods';

@Controller('/users')
export class UserController {

  @GET('/v1/list')
  getAllUser() {
    return 'Hello world!';
  }
}