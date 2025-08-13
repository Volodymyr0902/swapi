import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisDbs } from '../enums/redis-dbs.enum';
import { GeneralResponseDto } from '../../../common/dto/general-response.dto';

@Injectable()
export class OneTimeJwtStorageService {
  constructor(
    @InjectRedis(RedisDbs.ONE_TIME) private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  async save(id: number, token: string): Promise<void> {
    await this.redisClient.set(
      id.toString(),
      token,
      'EX',
      this.configService.getOrThrow<number>('AUTH_ONE_TIME_TTL'),
    );
  }

  async findOneByIdOrFail(id: number): Promise<string> {
    const token: string | null = await this.redisClient.get(id.toString());

    if (token == null) {
      throw new NotFoundException(
        '',
        "One-time token doesn't exist for this user",
      );
    }

    return token;
  }

  async remove(id: number): Promise<GeneralResponseDto> {
    const deletedCount: number = await this.redisClient.del(id.toString());
    if (!deletedCount) {
      throw new NotFoundException(
        '',
        "One-time token doesn't exist for this user",
      );
    }

    return { success: !!deletedCount };
  }
}
