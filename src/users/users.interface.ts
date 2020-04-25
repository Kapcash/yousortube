import { Schema, Document } from "mongoose";

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
  readonly creationDate?: Date;
}

export interface UserDoc extends UserAttr, Document {}

export const UserSchema = new Schema<UserAttr>({
  login: { type: String, required: true },
  password: { type: String, required: false },
  creationDate: { type: Date, default: Date.now },
});
