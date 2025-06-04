import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";
import {RegisterReqDto} from "./dto/register-req.dto";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {SafeUser} from "../users/types/safe-user.type";
import {LoginResDto} from "./dto/login-res.dto";
import {JwtPayload} from "./interfaces/jwt-payload.interface";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly configService: ConfigService,
                private readonly jwtService: JwtService,) {
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

    async login(user: SafeUser): Promise<LoginResDto> {
        const {username, id, roles} = user;
        const payload: JwtPayload = {
            username,
            sub: id,
            roles: roles.map(role => role.name)
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
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
}
