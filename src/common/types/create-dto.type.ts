import {CreatePersonDto} from "../../people/dto/create-person.dto";
import {CreateFilmDto} from "../../films/dto/create-film.dto";
import {CreatePlanetDto} from "../../planets/dto/create-planet.dto";
import {CreateStarshipDto} from "../../starships/dto/create-starship.dto";
import {CreateSpecieDto} from "../../species/dto/create-specie.dto";
import {CreateVehicleDto} from "../../vehicles/dto/create-vehicle.dto";
import {CreateImageDto} from "../../images/dto/create-image.dto";

export type CreateDto =
    | CreatePersonDto
    | CreateFilmDto
    | CreatePlanetDto
    | CreateStarshipDto
    | CreateSpecieDto
    | CreateVehicleDto
    | CreateImageDto;