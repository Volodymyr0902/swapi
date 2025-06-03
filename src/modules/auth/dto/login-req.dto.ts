import {IsNotEmpty} from "class-validator";
import {ApiProperty, ApiSchema} from "@nestjs/swagger";

@ApiSchema({ name: 'Login', description: 'DTO for user login'})
export class LoginReqDto {
    @ApiProperty({
        example: 'johnDou',
        description: 'Username used to sign in',})
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'sUpeRSeCrEtP@ssw0rd',
        description: 'Password used to sign in',})
    @IsNotEmpty()
    password: string;
}
