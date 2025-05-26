import {Injectable} from '@nestjs/common';
import {CreateStarshipDto} from './dto/create-starship.dto';
import {UpdateStarshipDto} from './dto/update-starship.dto';
import {Starship} from "./entities/starship.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {RelationsCompleterService} from "../../common/services/relations-completer.service";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";

@Injectable()
export class StarshipsService {
    constructor(@InjectRepository(Starship) private readonly starshipRepository: Repository<Starship>,
                private readonly relationsCompleter: RelationsCompleterService<Starship>,) {}

    async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
        const newStarship: Starship = await this.relationsCompleter.forCreate(createStarshipDto, Starship);
        return this.starshipRepository.save(newStarship);
    }

    findAll(paginationDto: PaginationDto): Promise<Starship[]> {
        const {page, limit} = paginationDto;
        const skip: number = page * limit - limit;

        return this.starshipRepository.find({
            skip,
            take: limit,
            relations: this.starshipRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    findOne(id: number): Promise<Starship> {
        return this.starshipRepository.findOneOrFail({
            where: {id},
            relations: this.starshipRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    async update(id: number, updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
        const completedStarship: Starship = await this.relationsCompleter.forUpdate(id, updateStarshipDto, Starship);
        return this.starshipRepository.save(completedStarship)
    }

    async remove(id: number): Promise<DeleteResponseDto> {
        const {affected} = await this.starshipRepository.delete(id)
        return {success: !!affected};
    }
}
