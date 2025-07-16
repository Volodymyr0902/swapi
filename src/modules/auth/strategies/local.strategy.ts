import * as bcrypt from 'bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { SerializedUser } from '../../users/types/serialized-user.type';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<SerializedUser> {
    const user: User = await this.usersService.findOne(username);
    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('', 'Invalid credentials');
    }

    return instanceToPlain(user) as SerializedUser;
  }
}
