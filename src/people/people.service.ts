import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "./entities/person.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

export class PeopleService {
    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>,
                private readonly relationsCompleter: RelationsCompleterService<Person>) {
    }

    async create(createPersonDto: CreatePersonDto) {
        const person = await this.relationsCompleter.forCreate(createPersonDto, Person);
        return this.personRepository.save(person);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.personRepository.find({
            skip,
            take: limit,
            relations: this.personRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.personRepository.findOne({
            where: {id},
            relations: this.personRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updatePersonDto: UpdatePersonDto) {
        const completedPerson = await this.relationsCompleter.forUpdate(id, updatePersonDto, Person);
        return this.personRepository.save(completedPerson);
    }

    remove(id: number) {
        return this.personRepository.delete(id);
    }
}
