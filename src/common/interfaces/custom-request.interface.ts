import { SerializedUser } from '../../modules/users/types/serialized-user.type';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user: SerializedUser;
  sid: string;
  ip: string;
}
