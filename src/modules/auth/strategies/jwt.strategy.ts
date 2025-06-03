import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "../interfaces/jwt-payload.interface";
import {SafeUser} from "../../users/types/safe-user.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('auth.secret'),
        });
    }

    validate(payload: JwtPayload): SafeUser {
        return {id: payload.sub, username: payload.username};
    }
}