import {UserOnReq} from "../../users/types/user-on-req.type";

export interface ReqWithUserStrRoles extends Request {
  user: UserOnReq;
}