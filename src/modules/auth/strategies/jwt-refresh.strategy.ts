import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CustomRequest } from '../../../common/interfaces/custom-request.interface';
import { SerializedUser } from '../../users/types/serialized-user.type';
import {ClientInfoService} from "../services/client-info.service";
import {SessionStorageService} from "../services/session-storage.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly clientInfoService: ClientInfoService,
    private readonly sessionsStorageService: SessionStorageService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('AUTH_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: CustomRequest,
    payload: JwtPayload,
  ): Promise<SerializedUser> {
    const refreshTokenInput: string | null =
      ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const { sub, username, roles, sid } = payload;
    const {refreshToken, clientInfoDigest} = await this.sessionsStorageService.findBySubSidOrFail(sub, sid);

    if (refreshTokenInput !== refreshToken) {
      throw new UnauthorizedException('', 'This refresh token was revoked');
    }

    const userAgent: string = req.headers['user-agent'];
    const ip: string = req.ip
    const currentClientInfoDigest: string = this.clientInfoService.digestClientInfo(ip, userAgent)

    if (currentClientInfoDigest !== clientInfoDigest) {
      throw new UnauthorizedException('', 'This refresh token belongs to another client');
    }

    req.sid = sid;
    return { id: sub, username, roles };
  }
}
