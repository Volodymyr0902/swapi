import { UserWithStrRoles } from '../../users/types/user-with-str-roles.type';

export interface ReqWithUserStrRoles extends Request {
  user: UserWithStrRoles;
}
