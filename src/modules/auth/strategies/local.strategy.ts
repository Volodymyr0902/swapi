import * as bcrypt from 'bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import { Strategy } from 'passport-local';
import {InjectRedis} from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import { SerializedUser } from '../../users/types/serialized-user.type';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import {SESSIONS_MAX_NUM} from "../constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService,
              @InjectRedis() private readonly redisClient: Redis,) {
    super();
  }

  async validate(username: string, password: string): Promise<SerializedUser> {
    const user: User = await this.usersService.findOne(username);
    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('', 'Invalid credentials');
    }

    const userSessions: string[] = await this.redisClient.keys(`${user.id}*`)

    if (userSessions.length >= SESSIONS_MAX_NUM) {
      throw new ForbiddenException('', 'Sessions limit reached');
    }

    return instanceToPlain(user) as SerializedUser;
  }
}
