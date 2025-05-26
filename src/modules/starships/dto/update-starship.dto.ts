import {ApiSchema, PartialType} from '@nestjs/swagger';
import { CreateStarshipDto } from './create-starship.dto';

@ApiSchema({name: 'UpdateStarship',
    description: "DTO for Starship update"
})
export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}
