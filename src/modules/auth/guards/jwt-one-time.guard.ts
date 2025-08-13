import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class JwtOneTimeGuard extends AuthGuard('jwt-one-time') {
  handleRequest(err: Error, user: any, info: unknown): any {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('', 'One-time token expired.');
    }

    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('', 'Invalid or absent one-time token.')
      );
    }

    return user;
  }
}
