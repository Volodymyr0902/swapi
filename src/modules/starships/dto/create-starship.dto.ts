import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
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
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'The model or official name of this starship.',
    example: 'DS-1 Orbital Battle Station',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  model: string;

  @ApiProperty({
    description: 'The class of this starship',
    example: 'Deep Space Mobile Battlestation',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  starship_class: string;

  @ApiProperty({
    description: 'The manufacturer of this starship.',
    example: 'Imperial Department of Military Research, Sienar Fleet Systems',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  manufacturer: string;

  @ApiProperty({
    description: 'The cost of this starship new, in galactic credits.',
    example: '1000000000000',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(10000000000000)
  cost_in_credits: string;

  @ApiProperty({
    description: 'The length of this starship in meters.',
    example: '120000',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(500000)
  length: string;

  @ApiProperty({
    description:
      'The number of personnel needed to run or pilot this starship.',
    example: '342953',
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(500000)
  crew: string;

  @ApiProperty({
    description:
      'The number of non-essential people this starship can transport.',
    example: '843342',
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(1000000)
  passengers: string;

  @ApiPropertyOptional({
    description: 'The maximum speed of this starship in the atmosphere.',
    example: '847',
    default: 'n/a',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(10000)
  max_atmosphering_speed: string;

  @ApiProperty({
    description: 'The class of this starships hyperdrive.',
    example: '4.0',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(10)
  hyperdrive_rating: string;

  @ApiProperty({
    description:
      'The Maximum number of Megalights this starship can travel in a standard hour. ',
    example: '10 MGLT',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  MGLT: string;

  @ApiProperty({
    description:
      'The maximum number of kilograms that this starship can transport.',
    example: '1000000000000',
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(10000000000000)
  cargo_capacity: string;

  @ApiProperty({
    description:
      'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.',
    example: '3 years',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
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
  @IsPositive({ each: true })
  @Max(100, { each: true })
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
  @IsPositive({ each: true })
  @Max(250, { each: true })
  @ArrayUnique()
  pilots: number[];
}
