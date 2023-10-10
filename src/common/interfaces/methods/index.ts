import { IRouter, NextFunction, Request, Response } from 'express';

import { ParamType } from '../../@types';

export interface IMetaMethod {
  path: string;
  requestMethod: keyof IRouter;
  methodName: string | symbol;
  middleware: MiddlewareFunction[];
}

export interface IMetaParameter {
  name: string;
  type: Function;
  paramType: ParamType;
}

export interface IMetaMiddleWare {
  methodName: string | symbol;
  middleware: MiddlewareFunction;
}

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;/**

* Metadata for REST service method parameters
*/
export class MethodParam {

  public name: string;
  public type: Function;
  public paramType: ParamType;
  constructor(name: string, type: Function, paramType: ParamType) {
    this.name = name;
    this.type = type;
    this.paramType = paramType;
  }
}