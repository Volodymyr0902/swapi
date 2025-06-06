import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SafeUser } from '../../users/types/safe-user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<SafeUser> {
    const user: SafeUser | null = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('', 'Invalid credentials');
    }

    return user;
  }
}
