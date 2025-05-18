import {forwardRef, Module} from '@nestjs/common';
import {SpeciesService} from './species.service';
import {SpeciesController} from './species.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Specie} from "./entities/specie.entity";
import {RelationsCompleterService} from "../common/services/relations-completer.service";
import {FilmsModule} from "../films/films.module";
import {PeopleModule} from "../people/people.module";
import {PlanetsModule} from "../planets/planets.module";
import {StarshipsModule} from "../starships/starships.module";

@Module({
    imports: [TypeOrmModule.forFeature([Specie]),
        PlanetsModule,
        StarshipsModule,
        forwardRef(() => FilmsModule),
        forwardRef(() => PeopleModule)
    ],
    controllers: [SpeciesController],
    providers: [SpeciesService, RelationsCompleterService],
    exports: [TypeOrmModule]
})
export class SpeciesModule {
}
