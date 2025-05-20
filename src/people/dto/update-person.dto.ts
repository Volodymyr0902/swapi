import { PartialType, ApiSchema } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';

@ApiSchema({name: 'UpdatePerson',
    description: "DTO for Person update"
})
export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
