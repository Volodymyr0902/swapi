import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const token: string = this.getTokenFromHeader(request);
        const secret: string = this.configService.getOrThrow<string>('auth.secret')

        try {
            request.user = this.jwtService.verify(token, {secret});
        } catch (e) {
            throw new UnauthorizedException('', 'Failed to verify token')
        }

        return true;
    }

    private getTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        if (type === 'Bearer') {
            return token;
        } else {
            throw new UnauthorizedException('', 'Invalid token');
        }
    }
}
