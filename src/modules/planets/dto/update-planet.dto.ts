import { PartialType } from '@nestjs/swagger';
import { CreatePlanetDto } from './create-planet.dto';
import {ApiSchema} from "@nestjs/swagger";

@ApiSchema({name: 'UpdatePlanet',
    description: "DTO for Planet update"
})
export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}
