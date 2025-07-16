import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    {
      provide: RelationsCompleterService,
      useFactory: (dataSource: DataSource): RelationsCompleterService<Person> =>
        new RelationsCompleterService<Person>(dataSource, Person),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class PeopleModule {}
