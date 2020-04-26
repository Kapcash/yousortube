
  import { Controller, Post, Request, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { COOKIE_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRACY_MS } from 'src/constants';
import { RefreshService } from './refresh.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const refreshToken = await this.refreshService.getRefreshToken(req.user);
    res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, { maxAge: REFRESH_TOKEN_EXPIRACY_MS, httpOnly: true });

    const bodyRes = await this.authService.getJwtToken(req.user);
    res.status(HttpStatus.OK).send(bodyRes);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  async refreshLogin(@Request() req) {
    return this.authService.getJwtToken(req.user);
  }
}
