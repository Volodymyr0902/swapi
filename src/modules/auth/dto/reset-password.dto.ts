import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

@ApiSchema({
  name: 'ResetPassword',
  description: 'DTO for setting new password',
})
export class ResetPasswordDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJ0YWIudm92MzhAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3NTQzMTMwMDMsImV4cCI6MTc1NDMxMzYwM30.NlypjoWTcXEYSqx5u9aHCgZqNeNooeayVleqjCObU0s',
    description: 'Token from email',
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;

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
  newPassword: string;
}
