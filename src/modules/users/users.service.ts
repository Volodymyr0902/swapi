import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user-req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly relationsCompleter: RelationsCompleterService<User>,
  ) {}

  async create(createUserDto: CreateUserReqDto): Promise<User> {
    const { username, email } = createUserDto;
    await this.checkExists(username, email);

    const newUser: User =
      await this.relationsCompleter.forCreate(createUserDto);

    return this.userRepository.save(newUser);
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
      relations: ['roles'],
    });
  }

  async remove(id: number): Promise<GeneralResponseDto> {
    await this.userRepository.findOneByOrFail({ id });
    const { affected } = await this.userRepository.delete(id);
    return { success: !!affected };
  }

  async updatePasswordOrFail(
    id: number,
    password: string,
  ): Promise<GeneralResponseDto> {
    const { affected } = await this.userRepository.update(id, { password });
    if (!affected) {
      throw new NotFoundException('', 'Failed to update password');
    }
    return { success: !!affected };
  }

  private async checkExists(
    username: string,
    email: string,
  ): Promise<void> | never {
    const isExistsByUsername: boolean = await this.userRepository.existsBy({
      username,
    });
    if (isExistsByUsername) {
      throw new ConflictException('', 'User with this username already exists');
    }

    const isExistsByEmail: boolean = await this.userRepository.existsBy({
      email,
    });
    if (isExistsByEmail) {
      throw new ConflictException('', 'User with this email already exists');
    }
  }
}
