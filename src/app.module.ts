import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ImagesModule } from './images/images.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from "src/config/config-reader"
import {Image} from "./images/entities/image.entity";
import {Person} from "./people/entities/person.entity";
import {Specie} from "./species/entities/specie.entity";
import {Film} from "./films/entities/film.entity";
import {Vehicle} from "./vehicles/entities/vehicle.entity";
import {Starship} from "./starships/entities/starship.entity";
import {Planet} from "./planets/entities/planet.entity";
import {DbEnvVars} from "./common/types/env-vars.type";
import {DB_DRIVER, MIGRATIONS_PATH, MIGRATIONS_TABLE_NAME} from "./common/constants";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: DB_DRIVER,
        ...configService.get<DbEnvVars>("db"),
        entities: [Image, Person, Specie, Film, Vehicle, Starship, Planet],
        migrationsTableName: MIGRATIONS_TABLE_NAME,
        migrations: [MIGRATIONS_PATH],
        migrationsRun: false,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
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
