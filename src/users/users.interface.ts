import { Schema, Document, Types } from "mongoose";

export interface FileUploaded {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface User {
  readonly subscriptions: Types.ObjectId[];
  readonly creationDate?: Date;
}

export interface UserDoc extends User, Document {}

export const UserSchema = new Schema({
  creationDate: { type: Date, default: Date.now },
  subscriptions: { type: [Schema.Types.ObjectId], default: [] },
});