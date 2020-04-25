import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { JwtService } from '@nestjs/jwt';
import { UserDoc } from "../users.interface";
import { JwtPayload } from "./auth.types";
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDoc | null> {
    const user: UserDoc = await this.usersService.findOne(username, true);
    if (user && await compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserDoc) {
    const payload: JwtPayload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refreshToken() {
    // TODO Implementation
    return false;
  }
}