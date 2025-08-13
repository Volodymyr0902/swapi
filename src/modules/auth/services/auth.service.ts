import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import * as fs from 'node:fs/promises';
import { SendMailOptions } from 'nodemailer';
import { SerializedUser } from '../../users/types/serialized-user.type';
import { JwtAccessRefreshPayload } from '../interfaces/jwt-access-refresh-payload.interface';
import { TokensPairDto } from '../dto/tokens-pair.dto';
import { GeneralResponseDto } from '../../../common/dto/general-response.dto';
import { RegisterReqDto } from '../dto/register-req.dto';
import {
  ACCESS_TOKEN_JWT,
  ONE_TIME_JWT,
  PASS_RESET_EMAIL_SUB,
  PASS_RESET_HTML_PATH,
  REFRESH_TOKEN_JWT,
} from '../constants';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { ClientInfoService } from './client-info.service';
import { SessionStorageService } from './session-storage.service';
import { SessionData } from '../interfaces/session-data.interface';
import { EmailService } from '../../../common/services/email.service';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import * as path from 'node:path';
import { JwtOneTimePayload } from '../types/jwt-one-time-payload.type';
import { OneTimeJwtStorageService } from './one-time-jwt-storage.service';
import { EmailOptionsBuilderService } from '../../../common/services/email-options-builder.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(ACCESS_TOKEN_JWT) private readonly accessJwtService: JwtService,
    @Inject(REFRESH_TOKEN_JWT) private readonly refreshJwtService: JwtService,
    @Inject(ONE_TIME_JWT) private readonly oneTimeJwtService: JwtService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly clientInfoService: ClientInfoService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly oneTimeJwtStorageService: OneTimeJwtStorageService,
    private readonly emailOptionsBuilderService: EmailOptionsBuilderService,
  ) {}

  async login(
    user: SerializedUser,
    ip: string,
    userAgent: string,
  ): Promise<TokensPairDto> {
    const { username, email, id, roles } = user;
    const payload: JwtAccessRefreshPayload = {
      username,
      email,
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

  async deleteAccount(id: number): Promise<GeneralResponseDto> {
    await this.logoutAll(id);
    return this.usersService.remove(id);
  }

  async refresh(
    user: SerializedUser,
    ip: string,
    userAgent: string,
    sid: string,
  ): Promise<TokensPairDto> {
    const { username, email, id, roles } = user;
    const payload: JwtAccessRefreshPayload = {
      username,
      email,
      sub: id,
      sid,
      roles,
    };

    return this.generateTokens(payload, ip, userAgent);
  }

  async logoutCurrent(id: number, sid: string): Promise<GeneralResponseDto> {
    return this.sessionStorageService.removeOne(id, sid);
  }

  async logoutAll(id: number): Promise<GeneralResponseDto> {
    return this.sessionStorageService.removeAll(id);
  }

  async sendPasswordResetEmail(email: string): Promise<GeneralResponseDto> {
    const currentUser: User = await this.usersService.findOne(email);
    const serializedUser: SerializedUser = instanceToPlain(
      currentUser,
    ) as SerializedUser;
    const oneTimeToken: string =
      await this.generateOneTimeToken(serializedUser);

    const appEmailName: string =
      this.configService.getOrThrow<string>('APP_EMAIL_NAME');
    const appEmailAddress: string =
      this.configService.getOrThrow<string>('SMTP_USER');
    const rootDir: string = path.resolve(process.cwd(), PASS_RESET_HTML_PATH);
    const rawHtml: string = await fs.readFile(rootDir, 'utf8');
    const htmlWithToken: string = rawHtml.replace(
      '${oneTimeToken}',
      oneTimeToken,
    );

    const mailOptions: SendMailOptions = this.emailOptionsBuilderService
      .setFrom(`"${appEmailName}" <${appEmailAddress}>`)
      .setTo(email)
      .setSubject(PASS_RESET_EMAIL_SUB)
      .setHtml(htmlWithToken)
      .build();

    return this.emailService.sendMailOrFail(mailOptions);
  }

  async resetPassword(
    id: number,
    newPassword: string,
  ): Promise<GeneralResponseDto> {
    await this.oneTimeJwtStorageService.remove(id);
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(newPassword, salt);
    return this.usersService.updatePasswordOrFail(id, hash);
  }

  private async generateOneTimeToken(user: SerializedUser): Promise<string> {
    const { id, username, email, roles } = user;
    const payload: JwtOneTimePayload = {
      username,
      email,
      sub: id,
      roles,
    };

    const oneTimeToken: string = this.oneTimeJwtService.sign(payload);
    await this.oneTimeJwtStorageService.save(id, oneTimeToken);
    return oneTimeToken;
  }

  private async generateTokens(
    payload: JwtAccessRefreshPayload,
    ip: string,
    userAgent: string,
  ): Promise<TokensPairDto> {
    const accessToken: string = this.accessJwtService.sign(payload);
    const refreshToken: string = this.refreshJwtService.sign(payload);
    const clientInfoDigest: string = this.clientInfoService.digestClientInfo(
      ip,
      userAgent,
    );

    const sessionData: SessionData = {
      refreshToken,
      clientInfoDigest,
    };
    await this.sessionStorageService.save(
      payload.sub,
      payload.sid,
      sessionData,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
