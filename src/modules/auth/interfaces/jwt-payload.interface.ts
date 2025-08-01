export interface JwtPayload {
  sub: number;
  sid: string
  username: string;
  roles: string[];
}
