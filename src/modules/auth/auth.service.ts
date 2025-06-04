import {Inject, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";
import {RegisterReqDto} from "./dto/register-req.dto";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {SafeUser} from "../users/types/safe-user.type";
import {ResWithTokensDto} from "./dto/res-with-tokens.dto";
import {JwtPayload} from "./interfaces/jwt-payload.interface";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {ACCESS_TOKEN_JWT, REFRESH_TOKEN_JWT} from "./constants";
import {Role} from "../roles/entities/role.entity";
import {UserOnReq} from "../users/types/user-on-req.type";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly configService: ConfigService,
                @Inject(ACCESS_TOKEN_JWT) private readonly accessJwtService: JwtService,
                @Inject(REFRESH_TOKEN_JWT) private readonly refreshJwtService: JwtService,) {
    }

    async validateUser(username: string, password: string): Promise<SafeUser | null> {
        const user: User = await this.usersService.findOne(username);
        const isMatch: boolean = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: SafeUser): Promise<ResWithTokensDto> {
        const {username, id, roles} = user;
        const payload: JwtPayload = {
            username,
            sub: id,
            roles: roles.map((role: Role): string => role.name)
        };

        return this.getTokens(payload, username);
    }

    async register(registerDto: RegisterReqDto): Promise<SafeUser> {
        const {password} = registerDto;
        const salt: string = this.configService.getOrThrow<string>('auth.salt');
        const hash: string = await bcrypt.hash(password, salt);

        return this.usersService.create({...registerDto, password: hash});
    }

    async deleteAccount(user: SafeUser): Promise<GeneralResponseDto> {
        return this.usersService.remove(user.username)
    }

    async refresh(user: UserOnReq): Promise<ResWithTokensDto> {
        const {username, id, roles} = user;
        const payload: JwtPayload = {
            username,
            sub: id,
            roles,
        };

        return this.getTokens(payload, username);
    }

    private async getTokens(payload: JwtPayload, username: string): Promise<ResWithTokensDto> {
        const accessToken: string = this.accessJwtService.sign(payload);
        const refreshToken: string = this.refreshJwtService.sign(payload);

        const salt: string = this.configService.getOrThrow<string>('auth.salt');
        const hashedRefreshToken: string = await bcrypt.hash(refreshToken, salt);
        await this.usersService.updateToken(username, {refreshToken: hashedRefreshToken})

        return {
            accessToken,
            refreshToken
        }
    }
}
