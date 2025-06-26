import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { ACCESS_TOKEN_JWT, REFRESH_TOKEN_JWT } from './constants';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
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
  ],
  controllers: [AuthController],
})
export class AuthModule {}
