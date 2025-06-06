import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { FilmsModule } from '../films/films.module';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { SpeciesModule } from '../species/species.module';
import { PlanetsModule } from '../planets/planets.module';
import { StarshipsModule } from '../starships/starships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Vehicle]),
    FilmsModule,
    SpeciesModule,
    PlanetsModule,
    StarshipsModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleService, RelationsCompleterService],
  exports: [TypeOrmModule],
})
export class PeopleModule {}
