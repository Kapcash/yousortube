import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { JwtService } from '@nestjs/jwt';
import { UserDoc } from "../users.interface";
import { JwtPayload } from "./tokens.interface";
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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