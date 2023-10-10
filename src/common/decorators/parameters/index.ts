import * as _ from 'lodash';

import { META_PARAMETER, ParamType } from '../../@types';
import { IMetaParameter, MethodParam } from '../../interfaces';

/**
 * A decorator to be used on class properties or on service method arguments
 * to inform that the decorated property or argument should be bound to the
 * the current request.
 *
 * For example:
 *
 * ```
 * @ Path('context')
 * class TestService {
 *   @ ContextRequest
 *   request: express.Request;
 *   // ...
 * }
 * ```
 *
 * The field request on the above class will point to the current
 * request.
 */
export function ContextRequest(...args: Array<any>) {
  return new ParameterDecorator('ContextRequest').withType(ParamType.context_request)
    .decorateParameterOrProperty(args);
}

/**
 * A decorator to be used on class properties or on service method arguments
 * to inform that the decorated property or argument should be bound to the
 * the current response object.
 *
 * For example:
 *
 * ```
 * @ Path('context')
 * class TestService {
 *   @ ContextResponse
 *   response: express.Response;
 *   // ...
 * }
 * ```
 *
 * The field response on the above class will point to the current
 * response object.
 */
export function ContextResponse(...args: Array<any>) {
  return new ParameterDecorator('ContextResponse').withType(ParamType.context_response)
    .decorateParameterOrProperty(args);
}

/**
 * A decorator to be used on class properties or on service method arguments
 * to inform that the decorated property or argument should be bound to the
 * the next function.
 *
 * For example:
 *
 * ```
 * @ Path('context')
 * class TestService {
 *   @ ContextNext
 *   next: express.NextFunction
 *       // ...
 * }
 * ```
 *
 * The next function can be used to delegate to the next registered
 * middleware the current request processing.
 */
export function ContextNext(...args: Array<any>) {
  return new ParameterDecorator('ContextNext').withType(ParamType.context_next)
    .decorateParameterOrProperty(args);
}

class ParameterDecorator {
  private decorator: string;
  private paramType: ParamType | undefined;
  private nameRequired: boolean = false;
  private name: string = '';

  constructor(decorator: string) {
    this.decorator = decorator;
  }

  public withType(paramType: ParamType) {
    this.paramType = paramType;
    return this;
  }

  public withName(name: string) {
    this.nameRequired = true;
    this.name = name ? name.trim() : '';
    return this;
  }

  public decorateParameterOrProperty(args: Array<any>) {
    if (!this.nameRequired || this.name) {
      args = _.without(args, undefined);
      if (args.length < 3 || typeof args[2] === 'undefined') {
        return this.decorateProperty(args[0], args[1]);
      } else if (args.length === 3 && typeof args[2] === 'number') {
        return this.decorateParameter(args[0], args[1], args[2]);
      }
    }
    throw new Error(`Invalid @${this.decorator} Decorator declaration.`);
  }

  private decorateParameter(target: Object, propertyKey: string, parameterIndex: number) {
    if (!Reflect.hasMetadata(META_PARAMETER, target.constructor)) {
      Reflect.defineMetadata(META_PARAMETER, [], target.constructor);
    }
    const paramTypes = Reflect.getOwnMetadata('design:paramtypes', target, propertyKey);

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    const routes = Reflect.getMetadata(META_PARAMETER, target.constructor) as Array<IMetaParameter>;
    if (this.paramType) {
      routes.push({ ...new MethodParam('', paramTypes[parameterIndex], this.paramType) });
      Reflect.defineMetadata(MethodParam, routes, target.constructor);
    }
  }

  private decorateProperty(target: Function, key: string) {
    console.log(126, target, key);
  }
}