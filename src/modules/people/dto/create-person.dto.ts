import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreatePerson', description: 'DTO for Person creation' })
export class CreatePersonDto {
  @ApiProperty({
    description: 'The name of this person.',
    example: 'Luke Skywalker',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The birth year of the person, using the in-universe standard of BBY or ABY.',
    example: '19 BBY',
  })
  @IsString()
  birth_year: string;

  @ApiPropertyOptional({
    description: 'The eye color of this person.',
    default: 'n/a',
    example: 'Blue',
  })
  @IsOptional()
  @IsString()
  eye_color: string;

  @ApiPropertyOptional({
    description: 'The gender of this person.',
    default: 'n/a',
    example: 'Male',
  })
  @IsString()
  gender: string;

  @ApiPropertyOptional({
    description: 'The hair color of this person. ',
    default: 'n/a',
    example: 'Blond',
  })
  @IsOptional()
  @IsString()
  hair_color: string;

  @ApiProperty({
    description: 'The height of the person in centimeters',
    example: '172',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  height: string;

  @ApiProperty({
    description: 'The mass of the person in kilograms.',
    example: '77',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  mass: string;

  @ApiProperty({
    description: 'The skin color of this person.',
    example: 'Fair',
  })
  @IsString()
  skin_color: string;

  @ApiPropertyOptional({
    description: "A planet's id that this person was born on or inhabits",
    example: '2',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  homeworld: number;

  @ApiPropertyOptional({
    description: 'An array of film resource ids that this person has been in.',
    example: '[1, 2]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  films: number[];

  @ApiPropertyOptional({
    description: 'An array of species resource ids that this person belongs to.',
    example: '[1]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  species: number[];

  @ApiPropertyOptional({
    description: 'An array of starship resource ids that this person has piloted.',
    example: '[2]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  starships: number[];

  @ApiPropertyOptional({
    description: 'An array of vehicle resource ids that this person has piloted.',
    example: '[1]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  vehicles: number[];
}
