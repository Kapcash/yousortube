import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { JwtService } from '@nestjs/jwt';
import { UserDoc } from "../users.interface";
import { JwtPayload, RefreshTokenDoc } from "./tokens.interface";
import { compare } from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('Tokens') private tokensModel: Model<RefreshTokenDoc>,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDoc | null> {
    const user: UserDoc = await this.usersService.findOne(username);
    if (user && await compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async getJwtToken(user: UserDoc) {
    const payload: JwtPayload = { username: user.login, sub: user.id };
    return this.jwtService.sign(payload);
  }
}