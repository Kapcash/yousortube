import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDoc } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

export const REFRESH_TOKEN_STRATEGY = 'refresh-jwt';

// TODO Find a way to extends JwtStrategy and change ignoreExpiration value only
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY) {
  
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<UserDoc> {
    return this.userService.findOne(payload.username);
  }
}