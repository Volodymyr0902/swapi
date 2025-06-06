import { forwardRef, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { SpeciesModule } from '../species/species.module';
import { PlanetsModule } from '../planets/planets.module';
import { StarshipsModule } from '../starships/starships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    forwardRef(() => FilmsModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => PlanetsModule),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService, RelationsCompleterService],
  exports: [TypeOrmModule],
})
export class VehiclesModule {}
