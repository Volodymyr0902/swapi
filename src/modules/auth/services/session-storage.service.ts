import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRedis} from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import {SessionData} from "../interfaces/session-data.interface";
import {GeneralResponseDto} from "../../../common/dto/general-response.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SessionStorageService {
    constructor(@InjectRedis() private readonly redisClient: Redis,
                private readonly configService: ConfigService) {}

    async findBySubSidOrFail(sub: number, sid: string): Promise<SessionData> {
        const session: string | null = await this.redisClient.get(`${sub}:${sid}`);
        if (!session) {
            throw new UnauthorizedException('', 'Session does not exist');
        }
        return JSON.parse(session);
    }

    async save(sub: number, sid: string, sessionData: SessionData): Promise<void> {
        this.redisClient.set(
            `${sub}:${sid}`,
            JSON.stringify(sessionData),
            "EX",
            this.configService.getOrThrow<number>('AUTH_REFRESH_TTL')
        );
    }

    async removeOne(sub: number, sid: string): Promise<GeneralResponseDto> {
        const deletedCount: number = await this.redisClient.del(`${sub}:${sid}`);
        if (!deletedCount) {
            throw new UnauthorizedException('', 'Session does not exist')
        }

        return {success: !!deletedCount};
    }

    async removeAll(sub: number): Promise<GeneralResponseDto> {
        const keys: string[] = await this.redisClient.keys(`${sub}:*`);

        if (keys.length > 0) {
            const deletedCount: number = await this.redisClient.del(...keys);
            return {success: !!deletedCount}
        } else {
            throw new UnauthorizedException('', 'No session found for this user')
        }
    }
}