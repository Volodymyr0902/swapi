import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: unknown, user: any, info: unknown): any {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('', 'Refresh token expired.');
    }

    if (err || !user) {
      throw (
        err || new UnauthorizedException('', 'Invalid or absent refresh token.')
      );
    }

    return user;
  }
}
