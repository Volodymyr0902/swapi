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

@ApiSchema({ name: 'CreateStarship', description: 'DTO for Starship creation' })
export class CreateStarshipDto {
  @ApiProperty({
    description: 'The name of this starship.',
    example: 'Death Star',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The model or official name of this starship.',
    example: 'DS-1 Orbital Battle Station',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'The class of this starship',
    example: 'Deep Space Mobile Battlestation',
  })
  @IsString()
  starship_class: string;

  @ApiProperty({
    description: 'The manufacturer of this starship.',
    example: 'Imperial Department of Military Research, Sienar Fleet Systems',
  })
  @IsString()
  manufacturer: string;

  @ApiProperty({
    description: 'The cost of this starship new, in galactic credits.',
    example: '1000000000000',
  })
  @Type(() => Number)
  @IsNumber()
  cost_in_credits: string;

  @ApiProperty({
    description: 'The length of this starship in meters.',
    example: '120000',
  })
  @Type(() => Number)
  @IsNumber()
  length: string;

  @ApiProperty({
    description:
      'The number of personnel needed to run or pilot this starship.',
    example: '342953',
  })
  @Type(() => Number)
  @IsInt()
  crew: string;

  @ApiProperty({
    description:
      'The number of non-essential people this starship can transport.',
    example: '843342',
  })
  @Type(() => Number)
  @IsInt()
  passengers: string;

  @ApiPropertyOptional({
    description: 'The maximum speed of this starship in the atmosphere.',
    example: '847',
    default: 'n/a',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  max_atmosphering_speed: string;

  @ApiProperty({
    description: 'The class of this starships hyperdrive.',
    example: '4.0',
  })
  @Type(() => Number)
  @IsNumber()
  hyperdrive_rating: string;

  @ApiProperty({
    description:
      'The Maximum number of Megalights this starship can travel in a standard hour. ',
    example: '10 MGLT',
  })
  @IsString()
  MGLT: string;

  @ApiProperty({
    description:
      'The maximum number of kilograms that this starship can transport.',
    example: '1000000000000',
  })
  @Type(() => Number)
  @IsInt()
  cargo_capacity: string;

  @ApiProperty({
    description:
      'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.',
    example: '3 years',
  })
  @IsString()
  consumables: string;

  @ApiPropertyOptional({
    description: 'An array of Film ids that this starship has appeared in.',
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
      'An array of People ids that this starship has been piloted by.',
    example: '[1, 4]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  pilots: number[];
}
