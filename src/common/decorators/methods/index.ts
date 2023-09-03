import { IRouter } from 'express';

import { META_METHOD } from '../../@types/meta';
import { IMetaMethod } from '../../interfaces/methods';

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @GET('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const GET = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('get', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @POST('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const POST = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('post', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @PUT('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const PUT = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('put', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @PUT('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const DELETE = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('delete', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @HEAD('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const HEAD = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('head', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @OPTIONS('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const OPTIONS = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('options', path);
};

/**
 * A decorator to tell the [[Server]] that a method
 * should be called to process HTTP GET requests.
 *
 * For example:
 *
 * ```
 * @Controller('people')
 * class PeopleService {
 *   @PATCH('/v1/list')
 *   getPeople() {
 *      // ...
 *   }
 * }
 * ```
 *
 * Will create a service that listen for requests like:
 *
 * ```
 * GET http://mydomain/people
 * ```
 */
export const PATCH = (path: string): MethodDecorator => {
  return new MethodDecorators().decoratorMethods('patch', path);
};

class MethodDecorators {
  decoratorMethods(method: keyof IRouter, path: string): MethodDecorator {
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
}