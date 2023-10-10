import express from 'express';

import { ContextNext, Controller, POST } from '../../common';

@Controller('/parameters')
export class ParametersController {

  @POST('/v1/create')
  async createOrganization(
    @ContextNext next: express.NextFunction,
  ) {
    console.log(12, typeof next);
    return {};
  }
}
