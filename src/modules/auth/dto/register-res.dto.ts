import {OmitType} from "@nestjs/swagger";
import {RegisterReqDto} from "./register-req.dto";

export class RegisterResDto extends OmitType(RegisterReqDto, ['password'] as const) {}