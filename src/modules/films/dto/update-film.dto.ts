import { PartialType } from '@nestjs/swagger';
import { CreateFilmDto } from './create-film.dto';
import {ApiSchema} from "@nestjs/swagger";

@ApiSchema({name: 'UpdateFilm',
    description: "DTO for Film update"
})
export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
