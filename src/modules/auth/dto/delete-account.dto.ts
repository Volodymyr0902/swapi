import { LoginReqDto } from './login-req.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'DeleteAccount',
  description: 'DTO for account deletion',
})
export class DeleteAccountDto extends LoginReqDto {}
