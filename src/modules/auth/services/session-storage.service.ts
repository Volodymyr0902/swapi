import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { SessionData } from '../interfaces/session-data.interface';
import { GeneralResponseDto } from '../../../common/dto/general-response.dto';
import { ConfigService } from '@nestjs/config';
import { RedisDbs } from '../enums/redis-dbs.enum';

@Injectable()
export class SessionStorageService {
  constructor(
    @InjectRedis(RedisDbs.SESSIONS) private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  async findBySubSidOrFail(sub: number, sid: string): Promise<SessionData> {
    const session: string | null = await this.redisClient.get(`${sub}:${sid}`);
    if (!session) {
      throw new UnauthorizedException('', 'Session does not exist');
    }
    return JSON.parse(session);
  }

  async findKeysBySub(sub: number): Promise<string[]> {
    return this.redisClient.keys(`${sub}:*`);
  }

  async save(
    sub: number,
    sid: string,
    sessionData: SessionData,
  ): Promise<void> {
    await this.redisClient.set(
      `${sub}:${sid}`,
      JSON.stringify(sessionData),
      'EX',
      this.configService.getOrThrow<number>('AUTH_REFRESH_TTL'),
    );
  }

  async removeOne(sub: number, sid: string): Promise<GeneralResponseDto> {
    const deletedCount: number = await this.redisClient.del(`${sub}:${sid}`);
    if (!deletedCount) {
      throw new UnauthorizedException('', 'Session does not exist');
    }

    return { success: !!deletedCount };
  }

  async removeAll(sub: number): Promise<GeneralResponseDto> {
    const sessions: string[] = await this.findKeysBySub(sub);

    if (sessions.length === 0) {
      throw new UnauthorizedException('', 'No session found for this user');
    }

    const deletedCount: number = await this.redisClient.del(...sessions);
    return { success: !!deletedCount };
  }
}
