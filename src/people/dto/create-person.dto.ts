import {ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreatePersonDto {
    @IsString()
    name: string;

    @IsString()
    birth_year: string;

    @IsString()
    eye_color: string;

    @IsString()
    gender: string;

    @IsString()
    hair_color: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    height: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    mass: string;

    @IsString()
    skin_color: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    homeworld: number;

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    films: number[];

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
}
