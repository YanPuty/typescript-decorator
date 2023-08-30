import { IRouter } from 'express';

import { META_METHOD } from './@types/meta';
import { IMetaMethod } from './interfaces/methods';

export const GET = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return handleMethodDecorator('get', path);
};

export const POST = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return handleMethodDecorator('post', path);
};

export const PUT = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return handleMethodDecorator('put', path);
};

export const DELETE = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return handleMethodDecorator('delete', path);
};

export const PATCH = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return handleMethodDecorator('patch', path);
};


const handleMethodDecorator = (method: keyof IRouter, path: string,): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return (target, propertyKey: string | symbol): void => {
    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
    // To prevent any further validation simply set it to an empty array here.
    if (!Reflect.hasMetadata(META_METHOD, target.constructor)) {
      Reflect.defineMetadata(META_METHOD, [], target.constructor);
    }

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    const routes = Reflect.getMetadata(META_METHOD, target.constructor) as Array<IMetaMethod>;

    routes.push({ requestMethod: method, path, methodName: propertyKey, middleware: [] });
    Reflect.defineMetadata(META_METHOD, routes, target.constructor);
  };
}