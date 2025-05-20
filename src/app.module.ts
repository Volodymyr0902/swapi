import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ImagesModule } from './images/images.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';
import {dataSourceOptions} from "./data-source";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    PeopleModule,
    ImagesModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
