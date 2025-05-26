import {Injectable} from "@nestjs/common";
import {CreateDto} from "../types/create-dto.type";
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "../../modules/people/entities/person.entity";
import {DataSource, FindOptionsWhere, Repository} from "typeorm";
import {Film} from "../../modules/films/entities/film.entity";
import {Specie} from "../../modules/species/entities/specie.entity";
import {Vehicle} from "../../modules/vehicles/entities/vehicle.entity";
import {Starship} from "../../modules/starships/entities/starship.entity";
import {Planet} from "../../modules/planets/entities/planet.entity";
import {ExistingEntity} from "../types/existing-entity.type";
import {UpdateDto} from "../types/update-dto.type";

@Injectable()
export class RelationsCompleterService<T extends ExistingEntity> {
    constructor(private readonly dataSource: DataSource,
                @InjectRepository(Person) private readonly personRepository: Repository<Person>,
                @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
                @InjectRepository(Specie) private readonly specieRepository: Repository<Specie>,
                @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
                @InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
                @InjectRepository(Planet) private readonly planetRepository: Repository<Planet>) {}

    async forCreate(createDto: CreateDto, entity: new () => T): Promise<T> {
        const repository: Repository<T> = this.dataSource.getRepository(entity)
        let newEntity: T = repository.create();

        Object.assign(newEntity, createDto);
        return this.completeRelations(createDto, newEntity)
    }


    async forUpdate(id: number, updateDto: UpdateDto, entity: new () => T): Promise<T> {
        const repository: Repository<T> = this.dataSource.getRepository(entity)
        let entityFromDB: T = await repository.findOneByOrFail({id} as FindOptionsWhere<T>);

        Object.assign(entityFromDB, updateDto);
        entityFromDB = await this.completeRelations(updateDto, entityFromDB)

        return entityFromDB
    }

    private async completeRelations(dto: CreateDto | UpdateDto, entity: T): Promise<T> {
        if ("people" in entity && "people" in dto && dto.people != null) {
            entity.people = await Promise.all(dto.people.map(id => this.personRepository.findOneByOrFail({id})));
        }

        if ("pilots" in entity && "pilots" in dto && dto.pilots != null) {
            entity.pilots = await Promise.all(dto.pilots.map(id => this.personRepository.findOneByOrFail({id})));
        }

        if ("characters" in entity && "characters" in dto && dto.characters != null) {
            entity.characters = await Promise.all(dto.characters.map(id => this.personRepository.findOneByOrFail({id})));
        }

        if ("homeworld" in entity && "homeworld" in dto && dto.homeworld != null && Array.isArray(dto.homeworld)) {
            entity.homeworld = await this.planetRepository.findOneByOrFail({id: dto.homeworld})
        }

        if ("films" in entity && "films" in dto && Array.isArray(dto.films)) {
            entity.films = await Promise.all(dto.films.map(id => this.filmRepository.findOneByOrFail({id})));
        }

        if ("species" in entity && "species" in dto && Array.isArray(dto.species)) {
            entity.species = await Promise.all(dto.species.map(id => this.specieRepository.findOneByOrFail({id})))
        }

        if ("starships" in entity && "starships" in dto && Array.isArray(dto.starships)) {
            entity.starships = await Promise.all(dto.starships.map(id => this.starshipRepository.findOneByOrFail({id})));
        }

        if ("vehicles" in entity && "vehicles" in dto && Array.isArray(dto.vehicles)) {
            entity.vehicles = await Promise.all(dto.vehicles.map(id => this.vehicleRepository.findOneByOrFail({id})));
        }

        return entity
    }

}