import { SerializedUser } from '../../modules/users/types/serialized-user.type';

export interface CustomRequest extends Request {
  user: SerializedUser;
  sid: string;
  ip: string
}
