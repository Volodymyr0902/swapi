import {SafeUser} from "../../users/types/safe-user.type";

export interface ReqWithUserObjRoles extends Request {
    user: SafeUser
}