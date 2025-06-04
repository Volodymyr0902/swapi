import {SafeUser} from "./safe-user.type";

export type UserOnReq = Omit<SafeUser, 'roles'> & {
    roles: string[]
}