import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {v4} from "uuid";
import { SerializedUser } from '../../users/types/serialized-user.type';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { TokensPairDto } from '../dto/tokens-pair.dto';
import { GeneralResponseDto } from '../../../common/dto/general-response.dto';
import { RegisterReqDto } from '../dto/register-req.dto';
import { ACCESS_TOKEN_JWT, REFRESH_TOKEN_JWT } from '../constants';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import {ClientInfoService} from "./client-info.service";
import {SessionStorageService} from "./session-storage.service";
import {SessionData} from "../interfaces/session-data.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(ACCESS_TOKEN_JWT) private readonly accessJwtService: JwtService,
    @Inject(REFRESH_TOKEN_JWT) private readonly refreshJwtService: JwtService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly clientInfoService: ClientInfoService,
  ) {}

  async login(user: SerializedUser, ip: string, userAgent: string): Promise<TokensPairDto> {
    const { username, id, roles } = user;
    const payload: JwtPayload = {
      username,
      sub: id,
      sid: v4(),
      roles,
    };

    return this.generateTokens(payload, ip, userAgent);
  }

  async register(registerDto: RegisterReqDto): Promise<User> {
    const { password } = registerDto;
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(password, salt);

    return this.usersService.create({ ...registerDto, password: hash });
  }

  async deleteAccount(user: SerializedUser): Promise<GeneralResponseDto> {
    await this.logoutAll(user);
    return this.usersService.remove(user.username);
  }

  async refresh(user: SerializedUser, ip: string, userAgent: string, sid: string): Promise<TokensPairDto> {
    const { username, id, roles } = user;
    const payload: JwtPayload = {
      username,
      sub: id,
      sid,
      roles,
    };

    return this.generateTokens(payload, ip, userAgent);
  }

  async logoutCurrent(user: SerializedUser, sid: string): Promise<GeneralResponseDto> {
    return this.sessionStorageService.removeOne(user.id, sid);
  }

  async logoutAll(user: SerializedUser): Promise<GeneralResponseDto> {
    return this.sessionStorageService.removeAll(user.id)
  }

  private async generateTokens(
    payload: JwtPayload,
    ip: string,
    userAgent: string
  ): Promise<TokensPairDto> {
    const accessToken: string = this.accessJwtService.sign(payload);
    const refreshToken: string = this.refreshJwtService.sign(payload);
    const clientInfoDigest: string = this.clientInfoService.digestClientInfo(ip, userAgent)

    const sessionData: SessionData = {
      refreshToken,
      clientInfoDigest,
    }
    await this.sessionStorageService.save(payload.sub, payload.sid, sessionData)

    return {
      accessToken,
      refreshToken,
    };
  }
}
