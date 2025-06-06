import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Role[]> {
    const { page, limit } = paginationDto;
    const skip: number = page * limit - limit;

    const roles: Role[] = await this.roleRepository.find({
      skip,
      take: limit,
    });

    return instanceToPlain(roles) as Role[];
  }

  async findOne(name: string): Promise<Role> {
    const role: Role = await this.roleRepository.findOneByOrFail({ name });
    return instanceToPlain(role) as Role;
  }
}
