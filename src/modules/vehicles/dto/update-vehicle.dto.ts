import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'UpdateVehicle', description: 'DTO for Vehicle update' })
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
