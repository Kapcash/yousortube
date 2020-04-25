import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { JwtService } from '@nestjs/jwt';
import { User } from "../users.interface";
import { JwtPayload } from "./auth.types";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    // TODO Use bcrypt
    const user: User = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return { password: null, ...result };
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.login, sub: user._id.toString() };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refreshToken() {
    // TODO Implementation
    return false;
  }
}