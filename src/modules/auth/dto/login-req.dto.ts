import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Login', description: 'DTO for user login' })
export class LoginReqDto {
  @ApiProperty({
    example: 'mail@example.com',
    description: 'Email address used to sign in',
  })
  @Length(6, 32)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'sUpeRSeCrEtP@ssw0rd',
    description: 'Password used to sign in',
  })
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
