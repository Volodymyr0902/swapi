import {SignInReqDto} from "./sign-in-req.dto";
import {ApiSchema} from "@nestjs/swagger";

@ApiSchema({name: 'DeleteAccount', description: 'DTO for account deletion'})
export class DeleteAccountDto extends SignInReqDto {}