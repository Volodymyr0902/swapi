import {ConflictException, Injectable} from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {SafeUser} from "./types/safe-user.type";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserReqDto): Promise<SafeUser> {
    const {username} = createUserDto
    if (await this.userRepository.existsBy({username})) {
      throw new ConflictException('', 'User with this username already exists')
    }

    const newUser: User = this.userRepository.create(createUserDto);
    const {password, ...user} = await this.userRepository.save(newUser);
    return user
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneByOrFail({username});
  }

  async remove(username: string): Promise<GeneralResponseDto> {
    await this.userRepository.findOneByOrFail({username});
    const {affected} = await this.userRepository.delete({username});
    return {success: !!affected};
  }
}
