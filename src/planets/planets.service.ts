import {Injectable} from '@nestjs/common';
import {CreatePlanetDto} from './dto/create-planet.dto';
import {UpdatePlanetDto} from './dto/update-planet.dto';
import {Planet} from "./entities/planet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

@Injectable()
export class PlanetsService {
    constructor(@InjectRepository(Planet) private readonly planetRepository: Repository<Planet>,
                private readonly relationsCompleterService: RelationsCompleterService<Planet>,) {
    }

    async create(createPlanetDto: CreatePlanetDto) {
        const newPlanet = await this.relationsCompleterService.forCreate(createPlanetDto, Planet);
        return this.planetRepository.save(newPlanet);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.planetRepository.find({
            skip,
            take: limit,
            relations: this.planetRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.planetRepository.findOne({
            where: {id},
            relations: this.planetRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updatePlanetDto: UpdatePlanetDto) {
        const completedPlanet = await this.relationsCompleterService.forUpdate(id, updatePlanetDto, Planet);
        return this.planetRepository.save(completedPlanet)
    }

    remove(id: number) {
        return this.planetRepository.delete(id);
    }
}
