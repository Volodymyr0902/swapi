import {ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateSpecieDto {
    @IsString()
    name: string;

    @IsString()
    classification: string;

    @IsString()
    designation: string;

    @Type(() => Number)
    @IsNumber()
    average_height: string;

    @Type(() => Number)
    @IsInt()
    average_lifespan: string;

    @IsOptional()
    @IsString()
    eye_colors: string;

    @IsOptional()
    @IsString()
    hair_colors: string;

    @IsOptional()
    @IsString()
    skin_colors: string;

    @IsString()
    language: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    homeworld: number;

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    people: number[];

    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    films: number[];
}
