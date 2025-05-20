import {ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty, ApiPropertyOptional, ApiSchema} from "@nestjs/swagger";

@ApiSchema({name: 'CreatePlanet',
    description: "DTO for Planet creation"
})
export class CreatePlanetDto {
    @ApiProperty({
        description: "The name of this planet.",
        example: "Tatooine"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "The diameter of this planet in kilometers.",
        example: "10465"
    })
    @Type(() => Number)
    @IsNumber()
    diameter: string;

    @ApiProperty({
        description: "The number of standard hours it takes for this planet to complete a single rotation on its axis.",
        example: "23"
    })
    @Type(() => Number)
    @IsNumber()
    rotation_period: string;

    @ApiProperty({
        description: "The number of standard days it takes for this planet to complete a single orbit of its local star.",
        example: "304"
    })
    @Type(() => Number)
    @IsNumber()
    orbital_period: string;

    @ApiProperty({
        description: "A number denoting the gravity of this planet, where \"1\" is normal or 1 standard G.",
        example: "1"
    })
    @Type(() => Number)
    @IsNumber()
    gravity: string;

    @ApiProperty({
        description: "The average population of sentient beings inhabiting this planet.",
        example: "120000"
    })
    @Type(() => Number)
    @IsInt()
    population: string;

    @ApiProperty({
        description: "The climate of this planet.",
        example: "Arid"
    })
    @IsString()
    climate: string;

    @ApiProperty({
        description: "The terrain of this planet.",
        example: "Dessert"
    })
    @IsString()
    terrain: string;

    @ApiProperty({
        description: "The percentage of the planet surface that is naturally occurring water or bodies of water.",
        example: "1"
    })
    @Type(() => Number)
    @IsNumber()
    surface_water: string;

    @ApiPropertyOptional({
        description: "An array of People ids that live on this planet.",
        example: "[1, 4]",
        type: [Number]
    })
    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    residents: number[];

    @ApiPropertyOptional({
        description: "An array of Film ids that this planet has appeared in.",
        example: "[1, 4]",
        type: [Number]
    })
    @IsOptional()
    @Type(() => Array<number>)
    @IsArray()
    @IsInt({each: true})
    @ArrayUnique()
    films: number[];
}
