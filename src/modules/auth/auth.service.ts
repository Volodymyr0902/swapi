import {Injectable, UnauthorizedException} from '@nestjs/common';
import {SignInReqDto} from './dto/sign-in-req.dto';
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./types/jwt-payload.type";
import {SignInResDto} from "./dto/sign-in-res.dto";
import {RegisterDto} from "./dto/register.dto";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from "bcrypt";
import {DeleteAccountDto} from "./dto/delete-account.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }

    async signIn(signInDto: SignInReqDto): Promise<SignInResDto> {
        const {username, pass} = signInDto;
        const user: User = await this.usersService.findOne(username)
        const isMatch: boolean = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("", "Invalid credentials");
        }

        const payload: JwtPayload = {username, sub: user.id};
        const accessToken: string = this.jwtService.sign(payload);

        return {accessToken};
    }

    async register(registerDto: RegisterDto): Promise<GeneralResponseDto> {
        const {password} = registerDto;
        const salt: number = this.configService.getOrThrow<number>('auth.salt');
        const hash: string = await bcrypt.hash(password, salt);

        await this.usersService.create({...registerDto, password: hash});
        return {success: true};
    }

    async deleteAccount(deleteAccountDto: DeleteAccountDto): Promise<GeneralResponseDto> {
        const {username, pass} = deleteAccountDto;
        const user: User = await this.usersService.findOne(username)
        const isMatch: boolean = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("", "Invalid credentials");
        }

        return this.usersService.remove(username)
    }
}
