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

@ApiSchema({ name: 'CreateSpecie', description: 'DTO for Specie creation' })
export class CreateSpecieDto {
  @ApiProperty({
    description: 'The name of this species.',
    example: 'Wookie',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'The classification of this species',
    example: 'Mammal',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  classification: string;

  @ApiProperty({
    description: 'The designation of this species.',
    example: 'Sentient',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  designation: string;

  @ApiProperty({
    description: 'The average height of this species in centimeters.',
    example: '2.1',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(500)
  average_height: string;

  @ApiProperty({
    description: 'The average lifespan of this species in years.',
    example: '400',
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(2000)
  average_lifespan: string;

  @ApiPropertyOptional({
    description:
      'A comma-separated string of common eye colors for this species.',
    example: 'blue, green, yellow, brown, golden, red',
    default: 'none',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  eye_colors: string;

  @ApiPropertyOptional({
    description:
      'A comma-separated string of common hair colors for this species.',
    example: 'black, brown',
    default: 'none',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  hair_colors: string;

  @ApiPropertyOptional({
    description:
      'A comma-separated string of common skin colors for this species.',
    example: 'gray',
    default: 'none',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  skin_colors: string;

  @ApiProperty({
    description: 'The language commonly spoken by this species.',
    example: 'Shyriiwook',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  language: string;

  @ApiPropertyOptional({
    description:
      'The id of a planet resource, a planet that this species originates from.',
    example: '2',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  homeworld: number;

  @ApiPropertyOptional({
    description: 'An array of People ids that are a part of this species.',
    example: '[1, 3]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(250, { each: true })
  @ArrayUnique()
  people: number[];

  @ApiPropertyOptional({
    description: 'An array of Film ids that this species has appeared in.',
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
}
