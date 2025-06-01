import {CreateUserDto} from "../../users/dto/create-user.dto";
import {ApiSchema} from "@nestjs/swagger";

@ApiSchema({ name: 'Register', description: 'DTO for user registration'})
export class RegisterDto extends CreateUserDto {}