import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "../interfaces/jwt-payload.interface";
import {UserOnReq} from "../../users/types/user-on-req.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('auth.secret'),
        });
    }

    validate(payload: JwtPayload): UserOnReq {
        return {id: payload.sub, username: payload.username, roles: payload.roles};
    }
}