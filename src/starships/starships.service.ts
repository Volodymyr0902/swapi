import {Injectable} from '@nestjs/common';
import {CreateStarshipDto} from './dto/create-starship.dto';
import {UpdateStarshipDto} from './dto/update-starship.dto';
import {Starship} from "./entities/starship.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

@Injectable()
export class StarshipsService {
    constructor(@InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
                private readonly relationsCompleter: RelationsCompleterService<Starship>,) {}

    async create(createStarshipDto: CreateStarshipDto) {
        const newStarship = await this.relationsCompleter.forCreate(createStarshipDto, Starship);
        return this.starshipRepository.save(newStarship);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.starshipRepository.find({
            skip,
            take: limit,
            relations: this.starshipRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.starshipRepository.findOne({
            where: {id},
            relations: this.starshipRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updateStarshipDto: UpdateStarshipDto) {
        const completedStarship = await this.relationsCompleter.forUpdate(id, updateStarshipDto, Starship);
        return this.starshipRepository.save(completedStarship)
    }

    remove(id: number) {
        return this.starshipRepository.delete(id);
    }
}
