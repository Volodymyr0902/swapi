import {ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Film} from "../../films/entities/film.entity";
import {ManyToMany} from "typeorm";
import {Person} from "../../people/entities/person.entity";

export class CreateVehicleDto {
    @IsString()
    name: string;

    @IsString()
    model: string;

    @IsString()
    vehicle_class: string;

    @IsString()
    manufacturer: string;

    @Type(() => Number)
    @IsNumber()
    length: string;

    @Type(() => Number)
    @IsNumber()
    cost_in_credits: string;

    @Type(() => Number)
    @IsInt()
    crew: string;

    @Type(() => Number)
    @IsInt()
    passengers: string;

    @Type(() => Number)
    @IsInt()
    max_atmosphering_speed: string;

    @Type(() => Number)
    @IsInt()
    cargo_capacity: string;

    @IsString()
    consumables: string;

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
    pilots: number[];
}
