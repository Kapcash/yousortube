import { Injectable } from "@nestjs/common";
import { UserDoc } from "../users.interface";
import { RefreshTokenDoc } from "./tokens.interface";
import { hash } from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { REFRESH_TOKEN_EXPIRACY_MS } from "src/constants";

@Injectable()
export class RefreshService {

  constructor(
    @InjectModel('Tokens') private tokensModel: Model<RefreshTokenDoc>,
  ) {}

  /**
   * Create a new refresh token for a user and store a hash of it in db
   * @param user The user to associate with the refresh token
   */
  async createRefreshToken(user: UserDoc): Promise<RefreshTokenDoc> {
    const refreshToken = await hash(`${user.id}${user.login}`, 12);
    return this.tokensModel.create({
      refreshToken,
      userId: user.id,
      expiration: Date.now() + REFRESH_TOKEN_EXPIRACY_MS,
    });
  }

  /**
   * Revoke the refreshToken if it is expired
   * @return true if the token is expired, false else.
   */
  async revokeRefreshTokenIfExpired(refreshToken: RefreshTokenDoc): Promise<boolean> {
    if (refreshToken.expiration < new Date()) {
      await refreshToken.remove();
      return true;
    }
    return false;
  }

  /**
   * Get the correct refresh token for this user
   * It will create a new refresh token is the previous one is expired
   * @param user The user for which we want the refresh token
   */
  async getRefreshToken(user: UserDoc): Promise<string> {
    let refreshTokenDoc = (await this.tokensModel.findOne({ userId: user.id }).exec());
    if (!refreshTokenDoc || (refreshTokenDoc && await this.revokeRefreshTokenIfExpired(refreshTokenDoc))) {
      refreshTokenDoc = await this.createRefreshToken(user);
    }
    return refreshTokenDoc.refreshToken;
  }
}