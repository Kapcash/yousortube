import { Schema, Document, Types } from "mongoose";

export interface JwtPayload {
  username: string;
  sub: string;
}

export interface RefreshToken {
  readonly refreshToken: string;
  readonly userId: string;
  readonly expiration: Date;
}

export interface RefreshTokenDoc extends RefreshToken, Document {}

export const RefreshTokenSchema = new Schema<RefreshToken>({
  refreshToken: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true, unique: true },
  expiration: { type: Date, required: true },
});

export interface JwtDto {
  accessToken: string;
}
