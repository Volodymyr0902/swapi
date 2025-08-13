import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { CustomRequest } from '../../../common/interfaces/custom-request.interface';
import { SerializedUser } from '../../users/types/serialized-user.type';
import { OneTimeJwtStorageService } from '../services/one-time-jwt-storage.service';
import { JwtOneTimePayload } from '../types/jwt-one-time-payload.type';

@Injectable()
export class JwtOneTimeStrategy extends PassportStrategy(
  Strategy,
  'jwt-one-time',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly oneTimeJwtStorageService: OneTimeJwtStorageService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('AUTH_ONE_TIME_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: CustomRequest,
    payload: JwtOneTimePayload,
  ): Promise<SerializedUser> {
    const { sub, username, email, roles } = payload;
    const jwtFromRequest: string = ExtractJwt.fromBodyField('token')(req)!;
    const oneTimeToken: string =
      await this.oneTimeJwtStorageService.findOneByIdOrFail(sub);

    if (jwtFromRequest !== oneTimeToken) {
      throw new UnauthorizedException(
        '',
        "This one-time token doesn't match saved one",
      );
    }

    return { id: sub, username, email, roles };
  }
}
