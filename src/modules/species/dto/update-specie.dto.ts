import { PartialType } from '@nestjs/swagger';
import { CreateSpecieDto } from './create-specie.dto';
import {ApiSchema} from "@nestjs/swagger";

@ApiSchema({name: 'UpdateSpecie',
    description: "DTO for Specie update"
})
export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}
