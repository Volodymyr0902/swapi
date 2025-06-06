import { ApiSchema } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

@ApiSchema({ name: 'UpdateUser', description: 'DTO for user update' })
export class UpdateTokenDto {
  @IsJWT()
  refreshToken: string;
}
