import express from 'express';

export async function loggerA(_: express.Request, _R: express.Response, next: express.NextFunction) {
  try {
    console.time("======LOGGER A======");
    next();
  } catch (error) {
    next(error);
  }
}

export async function loggerB(_: express.Request, _R: express.Response, next: express.NextFunction) {
  try {
    console.time("======LOGGER B======");
    next();
  } catch (error) {
    next(error);
  }
}

export async function loggerC(_: express.Request, _R: express.Response, next: express.NextFunction) {
  try {
    console.time("======LOGGER C======");
    next();
  } catch (error) {
    next(error);
  }
}