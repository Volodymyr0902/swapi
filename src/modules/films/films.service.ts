import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Film} from "./entities/film.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {RelationsCompleterService} from "../../common/services/relations-completer.service";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";

@Injectable()
export class FilmsService {
    constructor(@InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
                private readonly relationsCompleter: RelationsCompleterService<Film>,) {}

    async create(createFilmDto: CreateFilmDto): Promise<Film> {
        const newFilm: Film = await this.relationsCompleter.forCreate(createFilmDto, Film);
        return this.filmsRepository.save(newFilm);
    }

    findAll(paginationDto: PaginationDto): Promise<Film[]> {
        const {page, limit} = paginationDto;
        const skip: number = page * limit - limit;

        return this.filmsRepository.find({
            skip,
            take: limit,
            relations: this.filmsRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    findOne(id: number): Promise<Film> {
        return this.filmsRepository.findOneOrFail({
            where: {id},
            relations: this.filmsRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
        const completedFilm: Film = await this.relationsCompleter.forUpdate(id, updateFilmDto, Film);
        return this.filmsRepository.save(completedFilm);
    }

    async remove(id: number): Promise<DeleteResponseDto> {
        if (!(await this.filmsRepository.existsBy({id}))) {
            throw new NotFoundException(`Film with id ${id} not found`);
        }

        const {affected} = await this.filmsRepository.delete(id);
        return {success: !!affected};
    }
}
