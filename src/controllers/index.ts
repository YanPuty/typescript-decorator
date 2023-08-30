import { NextFunction, Request, Response, Router } from 'express';

import { META_CONTROLLER, META_METHOD, META_MIDDLEWARE } from '../decorators/@types/meta';
import { IMetaMethod, MiddlewareFunction } from '../decorators/interfaces/methods';
import { OrganizationController } from './OrganizationController';
import { UserController } from './UserController';

const router = Router();
const controllers = [UserController, OrganizationController];

controllers.forEach((controller: any) => {
  var instance = new controller();
  const prefix = Reflect.getMetadata(META_CONTROLLER, controller);
  const routes: Array<IMetaMethod> = Reflect.getMetadata(META_METHOD, controller);
  const allMiddleware = Reflect.getMetadata(META_MIDDLEWARE, controller) as MiddlewareFunction[];
  console.log('->>>', allMiddleware);

  routes.forEach((route: IMetaMethod) => {
    const routePath = prefix + route.path;
    const methodName = route.methodName;

    const middleWares: MiddlewareFunction[] = [];

    (router as any)[(route.requestMethod)](routePath, middleWares, (req: Request, res: Response, next: NextFunction) => {
      try {
        const a = instance[methodName](req, res, next);
        res.json(a)
      } catch (error) {
        next(error);
      }
    });
  });
});

export default router;