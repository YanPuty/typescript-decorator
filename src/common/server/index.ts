import express, { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

import { META_CONTROLLER, META_METHOD, META_MIDDLEWARE, META_PARAMETER } from '../@types';
import { IMetaMethod, IMetaMiddleWare, IMetaParameter, MiddlewareFunction } from '../interfaces';

/**
 * The Http server main class.
 */
export class Server {
  app: express.Application;

  constructor(application: express.Application) {
    this.app = application;
  }

  registerController(controllers: any[]) {
    controllers.forEach((controller: any) => {
      const instance = new controller();
      const prefix = Reflect.getMetadata(META_CONTROLLER, controller);
      const routes = this._getRegisterRoutes(controller);
      const allMiddleware = this._getRegisterMiddleWare(controller);

      routes.forEach((route: IMetaMethod) => {
        const routePath = prefix + route.path;
        const methodName = route.methodName;
        const middleWares: MiddlewareFunction[] = [];
        const parameter = this._getRegisterParam(controller);
        const filterMiddleWares = _.filter(allMiddleware, { methodName });
        console.log(parameter);

        if (allMiddleware.length) {
          filterMiddleWares.forEach(({ middleware }) => {
            middleWares.push(middleware);
          });
        }
        (this.app as any)[(route.requestMethod)]('/api' + routePath, ...middleWares, async (req: Request, res: Response, next: NextFunction) => {
          try {
            const a = await instance[methodName](req, res, next);
            res.json(a)
          } catch (error: any) {
            return next(error)
          }
        });
      });
    });
  }

  private _getRegisterRoutes(controller: any): IMetaMethod[] {
    return Reflect.getMetadata(META_METHOD, controller);
  }

  private _getRegisterMiddleWare(controller: any): IMetaMiddleWare[] {
    return Reflect.getMetadata(META_MIDDLEWARE, controller) as IMetaMiddleWare[] ?? [];
  }

  private _getRegisterParam(controller: any): IMetaParameter[] {
    return Reflect.getMetadata(META_PARAMETER, controller) as IMetaParameter[] ?? [];
  }
}