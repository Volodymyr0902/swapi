import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

@ApiSchema({ name: 'CreateUser', description: 'DTO for user creation' })
export class CreateUserReqDto {
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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
