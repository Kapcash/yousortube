import { Schema, Document, Types } from "mongoose";

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
  readonly password?: string;
  readonly subscriptions: Types.ObjectId[];
  readonly creationDate?: Date;
}

export interface User extends UserAttr {
  _id: string;
}

export interface UserDoc extends UserAttr, Document {}

export const UserSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  subscriptions: { type: [Schema.Types.ObjectId], default: [] },
});