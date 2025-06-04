import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {TokenExpiredError} from "@nestjs/jwt";

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
    handleRequest(err: unknown, user: any, info: unknown): any {
        if (info instanceof TokenExpiredError) {
            throw new UnauthorizedException('', 'Access token expired.');
        }

        if (err || !user) {
            throw err || new UnauthorizedException('', 'Invalid or absent access token.');
        }

        return user;
    }
}