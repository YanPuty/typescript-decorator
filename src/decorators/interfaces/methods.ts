import { IRouter, NextFunction, Request, Response } from 'express';

export interface IMetaMethod {
  path: string;
  requestMethod: keyof IRouter;
  methodName: string | symbol;
  middleware: MiddlewareFunction[];
}

export interface IMetaMiddleWare {
  methodName: string | symbol;
  middleware: MiddlewareFunction;
}

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;