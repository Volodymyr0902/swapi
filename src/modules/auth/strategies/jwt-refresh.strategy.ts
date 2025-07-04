import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserWithStrRoles } from '../../users/types/user-with-str-roles.type';
import { UsersService } from '../../users/users.service';
import { ReqWithUserStrRoles } from '../interfaces/req-with-user-str-roles';
import * as bcrypt from 'bcrypt';

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
    req: ReqWithUserStrRoles,
    payload: JwtPayload,
  ): Promise<UserWithStrRoles> {
    const refreshTokenInput: string | null =
      ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const { sub: id, username, roles } = payload;
    const { refreshToken } = await this.usersService.findOne(username);

    if (!refreshToken || !refreshTokenInput) {
      throw new UnauthorizedException('', 'Refresh token does not exist');
    }

    const isMatch: boolean = await bcrypt.compare(
      refreshTokenInput,
      refreshToken,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        '',
        'Refresh token does not match local one.',
      );
    }

    return { id, username, roles };
  }
}
