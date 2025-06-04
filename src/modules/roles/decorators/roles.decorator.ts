import {SetMetadata} from "@nestjs/common";
import {ExistingRoles} from "../enums/roles.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ExistingRoles[]) => SetMetadata(ROLES_KEY, roles);