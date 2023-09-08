import { Request } from 'express';

import { Controller, GET, POST, PUT } from '../../common';
import { Outlet } from '../../models';
import { IBusinessHours } from '../../models/Outlets';

@Controller('/outlets')
export class OutletsController {

  @GET('/v1/:id/')
  async getOutletInfo(req: Request) {
    const { id } = req.params;
    const outlet = await Promise.resolve(Outlet.findById(id));
    return outlet;
  }

  @GET('/v1/:id/availability')
  async checkIfOrganizationIsAvailability(req: Request) {
    const { id } = req.params;
    const outlet = await Promise.resolve(Outlet.findById(id));
    if (!outlet) {
      return { availability: false };
    }
    if (outlet.availabilityHours.isAvailability24Hour) {
      return { availability: true };
    }
    return this._isCurrentAvailability(outlet.availabilityHours.businessHours);
  }

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

  private _isCurrentAvailability(businessHour: IBusinessHours[]): { availability: boolean } {
    if (!businessHour.length) {
      return { availability: false };
    }
    // Get the current time as a JavaScript Date object
    const currentTime = new Date();

    for (const slot of businessHour) {
      // Convert the start and end times from strings to JavaScript Date objects
      const startTime = this._getTime(slot.from);
      const endTime = this._getTime(slot.to);

      // Check if the current time is within the time slot
      if (currentTime >= startTime && currentTime <= endTime) {
        if (!slot.breakHours.length) {
          return { availability: true };
        }
        for (const breakSlot of slot.breakHours) {
          const breakStartTime = this._getTime(breakSlot.from);
          const breakEndTime = this._getTime(breakSlot.to);
          // If the current time falls within a break, it's not available
          if (currentTime >= breakStartTime && currentTime <= breakEndTime) {
            return { availability: false };
          }

          // If there are no breaks overlapping, it's available
          return { availability: true };
        }
      }
    }
    return { availability: false };
  }

  private _getTime(inputTime: string): Date {
    const [time, ampm] = inputTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const currentDate = new Date();

    // Set the hours and minutes based on the parsed values
    currentDate.setHours(ampm === "PM" ? hours + 12 : hours, minutes);
    return currentDate
  }
}