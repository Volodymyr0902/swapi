import {ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreatePlanetDto {
    @IsString()
    name: string;

    @Type(() => Number)
    @IsNumber()
    diameter: string;

    @Type(() => Number)
    @IsNumber()
    rotation_period: string;

    @Type(() => Number)
    @IsNumber()
    orbital_period: string;

    @Type(() => Number)
    @IsNumber()
    gravity: string;

    @Type(() => Number)
    @IsInt()
    population: string;

    @IsString()
    climate: string;

    @IsString()
    terrain: string;

    @Type(() => Number)
    @IsNumber()
    surface_water: string;

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    residents: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    films: number[];
}
