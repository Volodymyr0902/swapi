import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateVehicle', description: 'DTO for Vehicle creation' })
export class CreateVehicleDto {
  @ApiProperty({
    description: 'The name of this vehicle.',
    example: 'Sand Crawler',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The model or official name of this vehicle..',
    example: 'Digger Crawler',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'The class of this vehicle.',
    example: 'wheeled',
  })
  @IsString()
  vehicle_class: string;

  @ApiProperty({
    description: 'The manufacturer of this vehicle. ',
    example: 'Corellia Mining Corporation',
  })
  @IsString()
  manufacturer: string;

  @ApiProperty({
    description: 'The length of this vehicle in meters.',
    example: '36.8',
  })
  @Type(() => Number)
  @IsNumber()
  length: string;

  @ApiProperty({
    description: 'The cost of this vehicle new, in Galactic Credits.',
    example: '150000',
  })
  @Type(() => Number)
  @IsNumber()
  cost_in_credits: string;

  @ApiProperty({
    description: 'The number of personnel needed to run or pilot this vehicle.',
    example: '46',
  })
  @Type(() => Number)
  @IsInt()
  crew: string;

  @ApiProperty({
    description:
      'The number of non-essential people this vehicle can transport.',
    example: '30',
  })
  @Type(() => Number)
  @IsInt()
  passengers: string;

  @ApiProperty({
    description: 'The maximum speed of this vehicle in the atmosphere.',
    example: '30',
  })
  @Type(() => Number)
  @IsInt()
  max_atmosphering_speed: string;

  @ApiProperty({
    description:
      'The maximum number of kilograms that this vehicle can transport.',
    example: '50000',
  })
  @Type(() => Number)
  @IsInt()
  cargo_capacity: string;

  @ApiProperty({
    description:
      'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.',
    example: '2 months',
  })
  @IsString()
  consumables: string;

  @ApiPropertyOptional({
    description: 'An array of Film ids that this vehicle has appeared in.',
    example: '[1, 3]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  films: number[];

  @ApiPropertyOptional({
    description:
      'An array of People ids that this vehicle has been piloted by.',
    example: '[1, 3]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  pilots: number[];
}
