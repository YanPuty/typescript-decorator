import 'reflect-metadata';

import { META_CONTROLLER } from '../../@types/meta';

export function Controller(path: string = ''): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(META_CONTROLLER, path, target);

    // Since routes are set by our methods this should almost never be true (except the controller has no methods)
    if (!Reflect.hasMetadata(META_CONTROLLER, target)) {
      Reflect.defineMetadata(META_CONTROLLER, [], target);
    }
  };
}