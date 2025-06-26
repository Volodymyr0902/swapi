import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService, RelationsCompleterService],
  exports: [TypeOrmModule],
})
export class PeopleModule {}
