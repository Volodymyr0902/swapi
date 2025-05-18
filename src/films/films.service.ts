import {Injectable} from '@nestjs/common';
import {CreateFilmDto} from './dto/create-film.dto';
import {UpdateFilmDto} from './dto/update-film.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Film} from "./entities/film.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

@Injectable()
export class FilmsService {
    constructor(@InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
                private readonly relationsCompleter: RelationsCompleterService<Film>) {
    }

    async create(createFilmDto: CreateFilmDto) {
        const newFilm = await this.relationsCompleter.forCreate(createFilmDto, Film);
        return this.filmsRepository.save(newFilm);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.filmsRepository.find({
            skip,
            take: limit,
            relations: this.filmsRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.filmsRepository.findOne({
            where: {id},
            relations: this.filmsRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updateFilmDto: UpdateFilmDto) {
        const completedFilm = await this.relationsCompleter.forUpdate(id, updateFilmDto, Film);
        return this.filmsRepository.save(completedFilm);
    }

    remove(id: number) {
        return this.filmsRepository.delete(id);
    }
}
