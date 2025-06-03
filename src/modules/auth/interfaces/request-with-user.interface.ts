import {SafeUser} from "../../users/types/safe-user.type";

export interface RequestWithUser extends Request {
    user: SafeUser
}