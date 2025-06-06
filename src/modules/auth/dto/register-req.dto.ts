import { CreateUserReqDto } from '../../users/dto/create-user-req.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'Register',
  description: 'DTO for registration',
})
export class RegisterReqDto extends CreateUserReqDto {}
