import { forwardRef, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet]),
    StarshipsModule,
    forwardRef(() => SpeciesModule),
    forwardRef(() => FilmsModule),
    forwardRef(() => PeopleModule),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, RelationsCompleterService],
  exports: [TypeOrmModule],
})
export class PlanetsModule {}
