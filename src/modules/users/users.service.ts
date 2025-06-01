import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findOne(username: string): Promise<User> {
        return this.userRepository.findOneByOrFail({username})
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const {username} = createUserDto
        if (await this.userRepository.existsBy({username})) {
            throw new ConflictException('', 'User with this username already exists')
        }

        const newUser: User = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async remove(username: string): Promise<GeneralResponseDto> {
        await this.userRepository.findOneByOrFail({username})
        const {affected} = await this.userRepository.delete({username})
        return {success: !!affected}
    }
}
