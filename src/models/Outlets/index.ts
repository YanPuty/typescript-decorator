// Import necessary modules
import mongoose, { Document, Model, Schema } from 'mongoose';

import { Organization } from '../';

// Define an interface for the document (optional, but recommended)
export interface IOutlets extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  rating?: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  location: ILocations
  availabilityHours: IAvailabilityHours;
  organization: typeof Organization;
}

export interface ILocations extends Document {
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface IAvailabilityHours extends Document {
  isAvailability24Hour: boolean;
  businessHours: IBusinessHours[];
}

export interface IBusinessHours extends Document {
  date: number;
  from: string;
  to: string;
  breakHours: IBreakHours[];
}

export interface IBreakHours extends Document {
  from: string,
  to: string,
}

const breakHour: Schema<IBreakHours> = new Schema<IBreakHours>({
  from: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
});

const businessHourSchema: Schema<IBusinessHours> = new Schema<IBusinessHours>({
  date: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
  breakHours: [breakHour]
});

const availabilityHour: Schema<IAvailabilityHours> = new Schema<IAvailabilityHours>({
  isAvailability24Hour: {
    type: Boolean,
    default: false,
  },
  businessHours: [businessHourSchema]
});

const locationSchema: Schema<ILocations> = new Schema<ILocations>({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

// Define the schema
const outletSchema: Schema<IOutlets> = new Schema<IOutlets>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    availabilityHours: availabilityHour,
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    location: locationSchema,
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        // Transform the _id field to id
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Define and export the Outlet model
const Outlet: Model<IOutlets> = mongoose.model<IOutlets>('Outlet', outletSchema);

export default Outlet;
