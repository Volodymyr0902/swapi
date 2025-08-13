import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

@ApiSchema({ name: 'CreateUser', description: 'DTO for user creation' })
export class CreateUserReqDto {
  @ApiProperty({
    example: 'johnDou',
    description: 'Username used to sign in',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\w{6,24}$/g, {
    message: 'username must contain 6-24 symbols, only letters or numbers',
  })
  username: string;

  @ApiProperty({
    example: 'mail@example.com',
    description: 'Email address',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'sUpeRSeCrEtP@ssw0rd',
    description: 'Password used to sign in',
  })
  @IsString()
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
