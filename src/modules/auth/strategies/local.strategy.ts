import * as bcrypt from 'bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { validate, ValidationError } from 'class-validator';
import { SerializedUser } from '../../users/types/serialized-user.type';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SESSIONS_MAX_NUM } from '../constants';
import { SessionStorageService } from '../services/session-storage.service';
import { LoginReqDto } from '../dto/login-req.dto';
import { CustomRequest } from '../../../common/interfaces/custom-request.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionStorageService: SessionStorageService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    req: CustomRequest,
    email: string,
    password: string,
  ): Promise<SerializedUser> {
    const loginDto: LoginReqDto = plainToInstance(LoginReqDto, req.body);
    const validationErrors: ValidationError[] = await validate(loginDto);

    if (validationErrors.length > 0) {
      const errors: string[] = validationErrors
        .map((error) => {
          return error.constraints
            ? Object.values(error.constraints)
            : 'Unknown validation error';
        })
        .flat();
      throw new BadRequestException({
        cause: 'Validation failed',
        errors,
      });
    }

    const user: User = await this.usersService.findOne(email);
    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('', 'Invalid credentials');
    }

    const userSessions: string[] =
      await this.sessionStorageService.findKeysBySub(user.id);

    if (userSessions.length >= SESSIONS_MAX_NUM) {
      throw new ForbiddenException('', 'Sessions limit reached');
    }

    return instanceToPlain(user) as SerializedUser;
  }
}
