import { SerializedUser } from '../../modules/users/types/serialized-user.type';

export interface ReqWithSerializedUser extends Request {
  user: SerializedUser;
}
