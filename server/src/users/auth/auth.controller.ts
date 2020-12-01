
import { Controller, Post, Request, UseGuards, Res, Get, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { COOKIE_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRACY_MS } from 'src/constants';
import { RefreshService } from './refresh.service';
import { JwtDto } from './tokens.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshService: RefreshService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req, @Res() res: Response): Promise<JwtDto> {
    const refreshToken = await this.refreshService.getRefreshToken(req.user);
    res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, { maxAge: REFRESH_TOKEN_EXPIRACY_MS, httpOnly: true });

    const jwt = await this.authService.getJwtToken(req.user);
    return { accessToken: jwt };
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh-token')
  async refreshLogin(@Request() req): Promise<JwtDto> {
    return { accessToken: await this.authService.getJwtToken(req.user) };
  }
}
