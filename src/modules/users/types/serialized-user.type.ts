import { User } from '../entities/user.entity';

export type SerializedUser = Omit<User, 'password' | 'roles'> & {
  roles: string[];
};
