import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { REFRESH_TOKEN_STRATEGY } from '../strategies/refresh-jwt.strategy';
import { COOKIE_REFRESH_TOKEN } from 'src/constants';
import { RefreshService } from '../refresh.service';
import { isObservable } from "rxjs";

@Injectable()
export class RefreshAuthGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) {

  constructor(
    private readonly refreshService: RefreshService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // First call to get the `req.user` enriched
    let isCorrectJwt = await super.canActivate(context);

    // Checks refreshToken in cookie
    const req: Request = context.switchToHttp().getRequest();
    const refreshCookie = req.cookies[COOKIE_REFRESH_TOKEN];
    const expectedRefreshToken = await this.refreshService.getRefreshToken(req.user);
    const isCorrectRefreshToken = refreshCookie === expectedRefreshToken;

    // Handle types conflict with potential observable in the 'super' implementation
    if (isObservable(isCorrectJwt)) {
      isCorrectJwt = await isCorrectJwt.toPromise();
    }

    return isCorrectRefreshToken && isCorrectJwt;
  }
}
