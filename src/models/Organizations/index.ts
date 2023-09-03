// Import necessary modules
import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the document (optional, but recommended)
export interface IOrganization extends Document {
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt?: Date;
}

// Define the schema
const organizationSchema: Schema<IOrganization> = new Schema<IOrganization>(
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
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
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

// Define and export the Organization model
const Organization: Model<IOrganization> = mongoose.model<IOrganization>('Organization', organizationSchema);

export default Organization;
