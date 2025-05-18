import {forwardRef, Module} from '@nestjs/common';
import {FilmsService} from './films.service';
import {FilmsController} from './films.controller';
import {Film} from "./entities/film.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Specie} from "../species/entities/specie.entity";
import {SpeciesModule} from "../species/species.module";
import {PeopleModule} from "../people/people.module";
import {RelationsCompleterService} from "../common/services/relations-completer.service";
import {PlanetsModule} from "../planets/planets.module";
import {StarshipsModule} from "../starships/starships.module";

@Module({
    imports: [TypeOrmModule.forFeature([Film]),
        StarshipsModule,
        PlanetsModule,
        forwardRef(() => SpeciesModule),
        forwardRef(() => PeopleModule)],
    controllers: [FilmsController],
    providers: [FilmsService, RelationsCompleterService],
    exports: [TypeOrmModule]
})
export class FilmsModule {
}
