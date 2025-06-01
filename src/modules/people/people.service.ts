import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { NotFoundException } from '@nestjs/common';

export class PeopleService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private readonly relationsCompleter: RelationsCompleterService<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person: Person = await this.relationsCompleter.forCreate(createPersonDto, Person);
    return this.personRepository.save(person);
  }

  findAll(paginationDto: PaginationDto): Promise<Person[]> {
    const { page, limit } = paginationDto;
    const skip: number = page * limit - limit;

    return this.personRepository.find({
      skip,
      take: limit,
      relations: this.personRepository.metadata.relations.map((rel) => rel.propertyName),
    });
  }

  findOne(id: number): Promise<Person> {
    return this.personRepository.findOneOrFail({
      where: { id },
      relations: this.personRepository.metadata.relations.map((rel) => rel.propertyName),
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const completedPerson: Person = await this.relationsCompleter.forUpdate(
      id,
      updatePersonDto,
      Person,
    );
    return this.personRepository.save(completedPerson);
  }

  async remove(id: number): Promise<GeneralResponseDto> {
    if (!(await this.personRepository.existsBy({ id }))) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    const { affected } = await this.personRepository.delete(id);
    return { success: !!affected };
  }
}
