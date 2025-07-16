import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterReqDto } from './dto/register-req.dto';
import { JwtService } from '@nestjs/jwt';
import { SerializedUser } from '../users/types/serialized-user.type';
import { ResWithTokensDto } from './dto/res-with-tokens.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { ACCESS_TOKEN_JWT, REFRESH_TOKEN_JWT } from './constants';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(ACCESS_TOKEN_JWT) private readonly accessJwtService: JwtService,
    @Inject(REFRESH_TOKEN_JWT) private readonly refreshJwtService: JwtService,
  ) {}

  async login(user: SerializedUser): Promise<ResWithTokensDto> {
    const { username, id, roles } = user;
    const payload: JwtPayload = {
      username,
      sub: id,
      roles,
    };

    return this.getTokens(payload, username);
  }

  async register(registerDto: RegisterReqDto): Promise<User> {
    const { password } = registerDto;
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(password, salt);

    return this.usersService.create({ ...registerDto, password: hash });
  }

  async deleteAccount(user: SerializedUser): Promise<GeneralResponseDto> {
    return this.usersService.remove(user.username);
  }

  async refresh(user: SerializedUser): Promise<ResWithTokensDto> {
    const { username, id, roles } = user;
    const payload: JwtPayload = {
      username,
      sub: id,
      roles,
    };

    return this.getTokens(payload, username);
  }

  private async getTokens(
    payload: JwtPayload,
    username: string,
  ): Promise<ResWithTokensDto> {
    const accessToken: string = this.accessJwtService.sign(payload);
    const refreshToken: string = this.refreshJwtService.sign(payload);

    await this.usersService.updateToken(username, {
      refreshToken: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
