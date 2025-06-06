import { Injectable } from '@nestjs/common';
import { CreateDto } from '../types/create-dto.type';
import { Person } from '../../modules/people/entities/person.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Film } from '../../modules/films/entities/film.entity';
import { Specie } from '../../modules/species/entities/specie.entity';
import { Vehicle } from '../../modules/vehicles/entities/vehicle.entity';
import { Starship } from '../../modules/starships/entities/starship.entity';
import { Planet } from '../../modules/planets/entities/planet.entity';
import { ExistingEntity } from '../types/existing-entity.type';
import { UpdateDto } from '../types/update-dto.type';
import { Role } from '../../modules/roles/entities/role.entity';
import { ExistingRoles } from '../../modules/roles/enums/roles.enum';

@Injectable()
export class RelationsCompleterService<T extends ExistingEntity> {
  constructor(private readonly dataSource: DataSource) {}

  async forCreate(createDto: CreateDto, entity: new () => T): Promise<T> {
    const repository: Repository<T> = this.dataSource.getRepository(entity);
    const newEntity: T = repository.create();

    Object.assign(newEntity, createDto);
    return this.completeRelations(createDto, newEntity);
  }

  async forUpdate(
    id: number,
    updateDto: UpdateDto,
    entity: new () => T,
  ): Promise<T> {
    const repository: Repository<T> = this.dataSource.getRepository(entity);
    let entityFromDB: T = await repository.findOneByOrFail({
      id,
    } as FindOptionsWhere<T>);

    Object.assign(entityFromDB, updateDto);
    entityFromDB = await this.completeRelations(updateDto, entityFromDB);

    return entityFromDB;
  }

  private async completeRelations(
    dto: CreateDto | UpdateDto,
    entity: T,
  ): Promise<T> {
    if ('people' in entity && 'people' in dto && dto.people != null) {
      const personRepository: Repository<Person> =
        this.dataSource.getRepository<Person>(Person);
      entity.people = await Promise.all(
        dto.people.map((id) => personRepository.findOneByOrFail({ id })),
      );
    }

    if ('pilots' in entity && 'pilots' in dto && dto.pilots != null) {
      const personRepository: Repository<Person> =
        this.dataSource.getRepository<Person>(Person);
      entity.pilots = await Promise.all(
        dto.pilots.map((id) => personRepository.findOneByOrFail({ id })),
      );
    }

    if (
      'characters' in entity &&
      'characters' in dto &&
      dto.characters != null
    ) {
      const personRepository: Repository<Person> =
        this.dataSource.getRepository<Person>(Person);
      entity.characters = await Promise.all(
        dto.characters.map((id) => personRepository.findOneByOrFail({ id })),
      );
    }

    if (
      'homeworld' in entity &&
      'homeworld' in dto &&
      dto.homeworld != null &&
      Array.isArray(dto.homeworld)
    ) {
      const planetRepository: Repository<Planet> =
        this.dataSource.getRepository<Planet>(Planet);
      entity.homeworld = await planetRepository.findOneByOrFail({
        id: dto.homeworld,
      });
    }

    if ('films' in entity && 'films' in dto && Array.isArray(dto.films)) {
      const filmRepository: Repository<Film> =
        this.dataSource.getRepository<Film>(Film);
      entity.films = await Promise.all(
        dto.films.map((id) => filmRepository.findOneByOrFail({ id })),
      );
    }

    if ('species' in entity && 'species' in dto && Array.isArray(dto.species)) {
      const specieRepository: Repository<Specie> =
        this.dataSource.getRepository<Specie>(Specie);
      entity.species = await Promise.all(
        dto.species.map((id) => specieRepository.findOneByOrFail({ id })),
      );
    }

    if (
      'starships' in entity &&
      'starships' in dto &&
      Array.isArray(dto.starships)
    ) {
      const starshipRepository: Repository<Starship> =
        this.dataSource.getRepository<Starship>(Starship);
      entity.starships = await Promise.all(
        dto.starships.map((id) => starshipRepository.findOneByOrFail({ id })),
      );
    }

    if (
      'vehicles' in entity &&
      'vehicles' in dto &&
      Array.isArray(dto.vehicles)
    ) {
      const vehicleRepository: Repository<Vehicle> =
        this.dataSource.getRepository<Vehicle>(Vehicle);
      entity.vehicles = await Promise.all(
        dto.vehicles.map((id) => vehicleRepository.findOneByOrFail({ id })),
      );
    }

    if ('roles' in entity) {
      const roleRepository: Repository<Role> =
        this.dataSource.getRepository<Role>(Role);
      entity.roles = [
        await roleRepository.findOneByOrFail({ name: ExistingRoles.USER }),
      ];
    }

    return entity;
  }
}
