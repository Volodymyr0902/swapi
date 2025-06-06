import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private readonly speciesRepository: Repository<Specie>,
    private readonly relationsCompleter: RelationsCompleterService<Specie>,
  ) {}

  async create(createSpeciesDto: CreateSpecieDto): Promise<Specie> {
    const newSpecie: Specie = await this.relationsCompleter.forCreate(
      createSpeciesDto,
      Specie,
    );
    return this.speciesRepository.save(newSpecie);
  }

  findAll(paginationDto: PaginationDto): Promise<Specie[]> {
    const { page, limit } = paginationDto;
    const skip: number = page * limit - limit;

    return this.speciesRepository.find({
      skip,
      take: limit,
      relations: this.speciesRepository.metadata.relations.map(
        (rel) => rel.propertyName,
      ),
    });
  }

  findOne(id: number): Promise<Specie> {
    return this.speciesRepository.findOneOrFail({
      where: { id },
      relations: this.speciesRepository.metadata.relations.map(
        (rel) => rel.propertyName,
      ),
    });
  }

  async update(id: number, updateSpeciesDto: UpdateSpecieDto): Promise<Specie> {
    const completedSpecie: Specie = await this.relationsCompleter.forUpdate(
      id,
      updateSpeciesDto,
      Specie,
    );
    return this.speciesRepository.save(completedSpecie);
  }

  async remove(id: number): Promise<GeneralResponseDto> {
    if (!(await this.speciesRepository.existsBy({ id }))) {
      throw new NotFoundException(`Specie with id ${id} not found`);
    }

    const { affected } = await this.speciesRepository.delete(id);
    return { success: !!affected };
  }
}
