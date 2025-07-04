import { SafeUser } from './safe-user.type';

export type UserWithStrRoles = Omit<SafeUser, 'roles'> & {
  roles: string[];
};
