import { forwardRef, Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { SpeciesModule } from '../species/species.module';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    forwardRef(() => FilmsModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => PlanetsModule),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService, RelationsCompleterService],
  exports: [TypeOrmModule],
})
export class StarshipsModule {}
