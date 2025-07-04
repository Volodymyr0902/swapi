import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { UpdateTokenDto } from './dto/update-token.dto';
import {UserWithStrRoles} from "./types/user-with-str-roles.type";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly relationsCompleter: RelationsCompleterService<User>,
  ) {}

  async create(createUserDto: CreateUserReqDto): Promise<UserWithStrRoles> {
    const { username: usernameDto } = createUserDto;
    if (await this.userRepository.existsBy({ username: usernameDto })) {
      throw new ConflictException('', 'User with this username already exists');
    }

    const newUser: User = await this.relationsCompleter.forCreate(
      createUserDto,
      User,
    );

    const { id, username, roles } = await this.userRepository.save(newUser);
    return {
      id,
      username,
      roles: roles.map((role) => role.name),
    };
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { username },
      relations: ['roles'],
    });
  }

  async updateToken(
    username: string,
    updateTokenDto: UpdateTokenDto,
  ): Promise<GeneralResponseDto> {
    await this.userRepository.findOneByOrFail({ username });
    const { affected } = await this.userRepository.update(
      { username },
      updateTokenDto,
    );
    return { success: !!affected };
  }

  async remove(username: string): Promise<GeneralResponseDto> {
    await this.userRepository.findOneByOrFail({ username });
    const { affected } = await this.userRepository.delete({ username });
    return { success: !!affected };
  }
}
