import { Schema, Document } from "mongoose";
import { Subscription } from "src/subscriptions/subscription.interface";

export interface FileUploaded {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface UserAttr {
  readonly login: string;
  readonly password: string;
  readonly creationDate?: Date;
  readonly subscriptions?: Subscription[];
}

export interface UserDoc extends UserAttr, Document {}

export const UserSchema = new Schema<UserAttr>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  creationDate: { type: Date, default: Date.now },
  subscriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    default: [],
  }],
});
