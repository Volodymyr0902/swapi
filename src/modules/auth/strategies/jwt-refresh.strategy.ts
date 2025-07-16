import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { ReqWithSerializedUser } from '../../../common/interfaces/req-with-serialized-user.interface';
import { SerializedUser } from '../../users/types/serialized-user.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('AUTH_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: ReqWithSerializedUser,
    payload: JwtPayload,
  ): Promise<SerializedUser> {
    const refreshTokenInput: string | null =
      ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const { sub: id, username, roles } = payload;
    const { refreshToken } = await this.usersService.findOne(username);

    if (!refreshToken || !refreshTokenInput) {
      throw new UnauthorizedException('', 'Refresh token does not exist');
    }

    if (refreshTokenInput !== refreshToken) {
      throw new UnauthorizedException(
        '',
        'Refresh token does not match local one.',
      );
    }

    return { id, username, roles };
  }
}
