import { Request } from 'express';

import { Controller } from '../../decorators/controller';
import { GET, POST } from '../../decorators/methods';
import { Middleware } from '../../decorators/middleware';
import { loggerA, loggerB, loggerC } from '../../middlewares';

@Controller('/organization')
export class OrganizationController {

  @GET('/v1/list')
  @Middleware(loggerB)
  @Middleware([loggerA, loggerC])
  getAllOrganization(): string {
    return 'Organization world!';
  }

  @GET('/v1/:id')
  findOneById(req: Request): AB {
    return { id: Number(req.params.id) };
  }

  @POST('/v1/create')
  createOrganization(): AM {
    return { message: 'this is create' };
  }
}

interface AB {
  id: number;
}

interface AM {
  message: string;
}
