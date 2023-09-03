import { Request } from 'express';

import { Controller, POST, PUT } from '../../common';
import { Outlet } from '../../models';

@Controller('/outlets')
export class OutletsController {

  @POST('/v1/create')
  createOutlet(req: Request) {
    const params = req.body;
    const outlets = new Outlet(params);
    return outlets.save();
  }

  @PUT('/v1/:id')
  async updateOutletById(req: Request) {
    const params = req.body;
    const outlets = Outlet.findOneAndUpdate(params);
    return outlets;
  }
}