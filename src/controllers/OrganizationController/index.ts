import { Request } from 'express';

import { Controller, GET, POST } from '../../common';
import { Organization } from '../../models';

@Controller('/organization')
export class OrganizationController {

  @GET('/v1/list')
  getAllOrganization() {
    const organization = Organization.find({});
    return organization;
  }

  @GET('/v1/:id')
  findOneById(req: Request) {
    const { id } = req.params;
    const organization = Organization.findById(id);
    return organization;
  }

  @POST('/v1/create')
  async createOrganization(req: Request) {
    const object = new Organization(req.body);
    return object.save();
  }
}
