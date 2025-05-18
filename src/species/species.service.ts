import {Injectable} from '@nestjs/common';
import {CreateSpecieDto} from './dto/create-specie.dto';
import {UpdateSpecieDto} from './dto/update-specie.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Specie} from "./entities/specie.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

@Injectable()
export class SpeciesService {
    constructor(@InjectRepository(Specie) private readonly speciesRepository: Repository<Specie>,
                private readonly relationsCompleter: RelationsCompleterService<Specie>,) {
    }

    async create(createSpeciesDto: CreateSpecieDto) {
        const newSpecie = await this.relationsCompleter.forCreate(createSpeciesDto, Specie);
        return this.speciesRepository.save(newSpecie);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.speciesRepository.find({
            skip,
            take: limit,
            relations: this.speciesRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.speciesRepository.findOne({
            where: {id},
            relations: this.speciesRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updateSpeciesDto: UpdateSpecieDto) {
        const completedSpecie = await this.relationsCompleter.forUpdate(id, updateSpeciesDto, Specie);
        return this.speciesRepository.save(completedSpecie);
    }

    remove(id: number) {
        return this.speciesRepository.delete(id);
    }
}
