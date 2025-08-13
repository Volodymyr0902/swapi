import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { ACCESS_TOKEN_JWT, ONE_TIME_JWT, REFRESH_TOKEN_JWT } from './constants';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ClientInfoService } from './services/client-info.service';
import { SessionStorageService } from './services/session-storage.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { EmailService } from '../../common/services/email.service';
import { OneTimeJwtStorageService } from './services/one-time-jwt-storage.service';
import { EmailOptionsBuilderService } from '../../common/services/email-options-builder.service';
import { RedisDbs } from './enums/redis-dbs.enum';
import { JwtOneTimeStrategy } from './strategies/jwt-one-time.strategy';

@Module({
  imports: [
    UsersModule,
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): RedisModuleOptions => ({
          type: 'single',
          url: configService.getOrThrow<string>('REDIS_SESSIONS_URL'),
        }),
      },
      RedisDbs.SESSIONS,
    ),
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): RedisModuleOptions => ({
          type: 'single',
          url: configService.getOrThrow<string>('REDIS_ONE_TIME_URL'),
        }),
      },
      RedisDbs.ONE_TIME,
    ),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtOneTimeStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: ACCESS_TOKEN_JWT,
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('AUTH_ACCESS_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('AUTH_ACCESS_EXP'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: REFRESH_TOKEN_JWT,
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('AUTH_REFRESH_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('AUTH_REFRESH_EXP'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: ONE_TIME_JWT,
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('AUTH_ONE_TIME_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('AUTH_ONE_TIME_EXP'),
          },
        });
      },
      inject: [ConfigService],
    },
    ClientInfoService,
    SessionStorageService,
    EmailService,
    OneTimeJwtStorageService,
    EmailOptionsBuilderService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
