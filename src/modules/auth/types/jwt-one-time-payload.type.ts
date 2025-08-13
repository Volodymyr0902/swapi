import { JwtAccessRefreshPayload } from '../interfaces/jwt-access-refresh-payload.interface';

export type JwtOneTimePayload = Omit<JwtAccessRefreshPayload, 'sid'>;
