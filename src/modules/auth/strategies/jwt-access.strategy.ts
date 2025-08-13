import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessRefreshPayload } from '../interfaces/jwt-access-refresh-payload.interface';
import { SerializedUser } from '../../users/types/serialized-user.type';
import { CustomRequest } from '../../../common/interfaces/custom-request.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('AUTH_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(
    req: CustomRequest,
    payload: JwtAccessRefreshPayload,
  ): SerializedUser {
    req.sid = payload.sid;

    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
