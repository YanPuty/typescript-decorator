import { NextFunction, Request, Response, Router } from 'express';
import _ from 'lodash';

import { META_CONTROLLER, META_METHOD, META_MIDDLEWARE } from '../decorators/@types/meta';
import { IMetaMethod, IMetaMiddleWare, MiddlewareFunction } from '../decorators/interfaces/methods';
import { OrganizationController } from './OrganizationController';
import { UserController } from './UserController';

const router = Router();
const controllers = [UserController, OrganizationController];

controllers.forEach((controller: any) => {
  const instance = new controller();
  const prefix = Reflect.getMetadata(META_CONTROLLER, controller);
  const routes: Array<IMetaMethod> = Reflect.getMetadata(META_METHOD, controller);
  const allMiddleware = Reflect.getMetadata(META_MIDDLEWARE, controller) as IMetaMiddleWare[] ?? [];

  routes.forEach((route: IMetaMethod) => {
    const routePath = prefix + route.path;
    const methodName = route.methodName;
    const middleWares: MiddlewareFunction[] = [];
    const filterMiddleWares = _.filter(allMiddleware, { methodName });
    if (allMiddleware.length) {
      filterMiddleWares.forEach(({ middleware }) => {
        middleWares.push(middleware);
      });
    }
    console.log(12, allMiddleware);

    (router as any)[(route.requestMethod)](routePath, ...middleWares, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const a = await instance[methodName](req, res, next);
        res.json(a)
      } catch (error) {
        next(error);
      }
    });
  });
});

export default router;