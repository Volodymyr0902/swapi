import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({
  name: 'ForgotPassword',
  description: 'DTO for sending link to reset password',
})
export class ForgotPasswordDto {
  @ApiProperty({
    example: 'mail@example.com',
    description: 'Email set on registration, will receive reset link',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
