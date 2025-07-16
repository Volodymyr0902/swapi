import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Role[]> {
    const { page, limit } = paginationDto;
    const skip: number = page * limit - limit;

    return this.roleRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(name: string): Promise<Role> {
    return this.roleRepository.findOneByOrFail({ name });
  }
}
