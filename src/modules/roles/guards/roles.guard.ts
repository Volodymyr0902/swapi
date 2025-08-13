import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CustomRequest } from '../../../common/interfaces/custom-request.interface';
import { ExistingRoles } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: ExistingRoles[] = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<CustomRequest>();
    return requiredRoles.every((role: string): boolean =>
      user.roles?.includes(role),
    );
  }
}
