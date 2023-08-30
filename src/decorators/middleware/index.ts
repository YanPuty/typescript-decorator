import { META_MIDDLEWARE } from '../@types/meta';
import { MiddlewareFunction } from '../interfaces/methods';

export const Middleware = (middleWaresCB: MiddlewareFunction | MiddlewareFunction[]): MethodDecorator => {
  console.log(middleWaresCB);
  // `target` equals our class, `propertyKey` equals our decorated method name
  return registerMiddleWares(middleWaresCB);
};

const registerMiddleWares = (middleWaresCB: MiddlewareFunction | MiddlewareFunction[]): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: string | symbol): void => {

    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
    // To prevent any further validation simply set it to an empty array here.
    if (!Reflect.hasMetadata(META_MIDDLEWARE, target.constructor)) {
      Reflect.defineMetadata(META_MIDDLEWARE, [], target.constructor);
    }

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    const routes = Reflect.getMetadata(META_MIDDLEWARE, target.constructor) as Array<any>;
    routes.push({ middleware: middleWaresCB, methodName: propertyKey });
    Reflect.defineMetadata(META_MIDDLEWARE, routes, target.constructor);
  };
}