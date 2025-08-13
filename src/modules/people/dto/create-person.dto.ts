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

@ApiSchema({ name: 'CreatePerson', description: 'DTO for Person creation' })
export class CreatePersonDto {
  @ApiProperty({
    description: 'The name of this person.',
    example: 'Luke Skywalker',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description:
      'The birth year of the person, using the in-universe standard of BBY or ABY.',
    example: '19 BBY',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  birth_year: string;

  @ApiPropertyOptional({
    description: 'The eye color of this person.',
    default: 'n/a',
    example: 'Blue',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  eye_color: string;

  @ApiPropertyOptional({
    description: 'The gender of this person.',
    default: 'n/a',
    example: 'Male',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  gender: string;

  @ApiPropertyOptional({
    description: 'The hair color of this person. ',
    default: 'n/a',
    example: 'Blond',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  hair_color: string;

  @ApiProperty({
    description: 'The height of the person in centimeters',
    example: '172',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(500)
  height: string;

  @ApiProperty({
    description: 'The mass of the person in kilograms.',
    example: '77',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(500)
  mass: string;

  @ApiProperty({
    description: 'The skin color of this person.',
    example: 'Fair',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  skin_color: string;

  @ApiPropertyOptional({
    description: "A planet's id that this person was born on or inhabits",
    example: '2',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
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
  @IsPositive({ each: true })
  @Max(100, { each: true })
  @ArrayUnique()
  films: number[];

  @ApiPropertyOptional({
    description:
      'An array of species resource ids that this person belongs to.',
    example: '[1]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(150, { each: true })
  @ArrayUnique()
  species: number[];

  @ApiPropertyOptional({
    description:
      'An array of starship resource ids that this person has piloted.',
    example: '[2]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(150, { each: true })
  @ArrayUnique()
  starships: number[];

  @ApiPropertyOptional({
    description:
      'An array of vehicle resource ids that this person has piloted.',
    example: '[1]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(150, { each: true })
  @ArrayUnique()
  vehicles: number[];
}
