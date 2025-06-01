import {IsNotEmpty} from "class-validator";
import {ApiProperty, ApiSchema} from "@nestjs/swagger";

@ApiSchema({ name: 'SignIn', description: 'DTO for user sign in'})
export class SignInReqDto {
    @ApiProperty({
        example: 'johnDou',
        description: 'Username used to sign in',
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'sUpeRSeCrEtP@ssw0rd',
        description: 'Password used to sign in',
    })
    @IsNotEmpty()
    pass: string;
}
