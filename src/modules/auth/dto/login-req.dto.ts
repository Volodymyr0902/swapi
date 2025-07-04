import {IsNotEmpty, IsStrongPassword, Length, Matches} from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Login', description: 'DTO for user login' })
export class LoginReqDto {
  @ApiProperty({
    example: 'johnDou',
    description: 'Username used to sign in',
  })
  @IsNotEmpty()
  @Length(6, 24)
  @Matches(/^\w{6,24}$/g)
  username: string;

  @ApiProperty({
    example: 'sUpeRSeCrEtP@ssw0rd',
    description: 'Password used to sign in',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
