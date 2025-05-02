import {ExecutionContext, Injectable} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "./entities/person.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";

@Injectable()
export class PeopleService {
  constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) {}

  create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create(createPersonDto);
    console.log(newPerson);

    return this.personRepository.save(newPerson);
  }

  findAll(paginationDto: PaginationDto) {
    const {page = 1, limit = 10} = paginationDto;
    const skip = page * limit - limit;

    return this.personRepository.find({skip, take: limit});
  }

  findOne(id: number) {
    return this.personRepository.findOneBy({id});
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.personRepository.update(id, updatePersonDto);
  }

  remove(id: number) {
    return this.personRepository.delete(id);
  }
}
