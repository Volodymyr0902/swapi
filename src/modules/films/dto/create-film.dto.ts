import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateFilm', description: 'DTO for Film creation' })
export class CreateFilmDto {
  @ApiProperty({
    description: 'The title of this film.',
    example: 'A New Hope',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @ApiProperty({
    description: 'The episode number of this film',
    example: '3',
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  episode_id: number;

  @ApiProperty({
    description: 'The opening paragraphs at the beginning of this film',
    example:
      "It is a period of civil war.\\n\\nRebel spaceships, striking\\n\\nfrom a hidden base, have won\\n\\ntheir first victory against\\n\\nthe evil Galactic Empire.\\n\\n\\n\\nDuring the battle, Rebel\\n\\nspies managed to steal secret\\r\\nplans to the Empire's\\n\\nultimate weapon, the DEATH\\n\\nSTAR, an armored space\\n\\nstation with enough power\\n\\nto destroy an entire planet.\\n\\n\\n\\nPursued by the Empire's\\n\\nsinister agents, Princess\\n\\nLeia races home aboard her\\n\\nstarship, custodian of the\\n\\nstolen plans that can save her\\n\\npeople and restore\\n\\nfreedom to the galaxy....",
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  opening_crawl: string;

  @ApiProperty({
    description: 'The name of the director of this film.',
    example: 'George Lucas',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  director: string;

  @ApiProperty({
    description: 'The name(s) of the producer(s) of this film.',
    example: 'Gary Kurtz, Rick McCallum',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 80)
  producer: string;

  @ApiProperty({
    description: 'The ISO 8601 date format of film release',
    example: '1977-05-25',
  })
  @Type(() => Date)
  @IsDate()
  release_date: Date;

  @ApiPropertyOptional({
    description: 'An array of species resource ids that are in this film.',
    example: '[1, 2]',
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
    description: 'An array of starship resource ids that are in this film.',
    example: '[1, 2]',
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
    description: 'An array of vehicle resource ids that are in this film.',
    example: '[1, 2]',
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

  @ApiPropertyOptional({
    description: 'An array of people resource ids that are in this film.',
    example: '[1, 2]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(250, { each: true })
  @ArrayUnique()
  characters: number[];

  @ApiPropertyOptional({
    description: 'An array of planet resource ids that are in this film.',
    example: '[1, 2]',
    type: [Number],
  })
  @IsOptional()
  @Type(() => Array<number>)
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Max(150, { each: true })
  @ArrayUnique()
  planets: number[];
}
