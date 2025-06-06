import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    private readonly relationsCompleterService: RelationsCompleterService<Planet>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const newPlanet: Planet = await this.relationsCompleterService.forCreate(
      createPlanetDto,
      Planet,
    );
    return this.planetRepository.save(newPlanet);
  }

  findAll(paginationDto: PaginationDto): Promise<Planet[]> {
    const { page, limit } = paginationDto;
    const skip: number = page * limit - limit;

    return this.planetRepository.find({
      skip,
      take: limit,
      relations: this.planetRepository.metadata.relations.map(
        (rel) => rel.propertyName,
      ),
    });
  }

  findOne(id: number): Promise<Planet> {
    return this.planetRepository.findOneOrFail({
      where: { id },
      relations: this.planetRepository.metadata.relations.map(
        (rel) => rel.propertyName,
      ),
    });
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const completedPlanet: Planet =
      await this.relationsCompleterService.forUpdate(
        id,
        updatePlanetDto,
        Planet,
      );
    return this.planetRepository.save(completedPlanet);
  }

  async remove(id: number): Promise<GeneralResponseDto> {
    if (!(await this.planetRepository.existsBy({ id }))) {
      throw new NotFoundException(`Planet with id ${id} not found`);
    }

    const { affected } = await this.planetRepository.delete(id);
    return { success: !!affected };
  }
}
