import {UpdatePersonDto} from "../../people/dto/update-person.dto";
import {UpdateFilmDto} from "../../films/dto/update-film.dto";
import {UpdateSpecieDto} from "../../species/dto/update-specie.dto";
import {UpdateStarshipDto} from "../../starships/dto/update-starship.dto";
import {UpdateVehicleDto} from "../../vehicles/dto/update-vehicle.dto";
import {UpdatePlanetDto} from "../../planets/dto/update-planet.dto";

export type UpdateDto =
    | UpdatePersonDto
    | UpdateFilmDto
    | UpdateSpecieDto
    | UpdateStarshipDto
    | UpdateVehicleDto
    | UpdatePlanetDto;