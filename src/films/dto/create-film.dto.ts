import {ArrayUnique, IsArray, IsDate, IsInt, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {JoinTable, ManyToMany} from "typeorm";
import {Specie} from "../../species/entities/specie.entity";
import {Starship} from "../../starships/entities/starship.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";
import {Person} from "../../people/entities/person.entity";
import {Planet} from "../../planets/entities/planet.entity";

export class CreateFilmDto {
    @IsString()
    title: string;

    @Type(() => Number)
    @IsInt()
    episode_id: number;

    @IsString()
    opening_crawl: string;

    @IsString()
    director: string;

    @IsString()
    producer: string;

    @Type(() => Date)
    @IsDate()
    release_date: Date;

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    species: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    starships: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    vehicles: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    characters: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    planets: number[];
}
