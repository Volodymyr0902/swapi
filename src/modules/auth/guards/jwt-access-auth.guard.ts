import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { SKIP_ACCESS } from '../constants';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const skipAccess: boolean = this.reflector.getAllAndOverride<boolean>(
      SKIP_ACCESS,
      [context.getHandler(), context.getClass()],
    );

    if (skipAccess) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: unknown, user: any, info: unknown): any {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('', 'Access token expired.');
    }

    if (err || !user) {
      throw (
        err || new UnauthorizedException('', 'Invalid or absent access token.')
      );
    }

    return user;
  }
}
