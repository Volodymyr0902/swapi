export interface JwtAccessRefreshPayload {
  sub: number;
  sid: string;
  username: string;
  email: string;
  roles: string[];
}
