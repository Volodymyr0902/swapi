import {UpdatePersonDto} from "../../modules/people/dto/update-person.dto";
import {UpdateFilmDto} from "../../modules/films/dto/update-film.dto";
import {UpdateSpecieDto} from "../../modules/species/dto/update-specie.dto";
import {UpdateStarshipDto} from "../../modules/starships/dto/update-starship.dto";
import {UpdateVehicleDto} from "../../modules/vehicles/dto/update-vehicle.dto";
import {UpdatePlanetDto} from "../../modules/planets/dto/update-planet.dto";

export type UpdateDto =
    | UpdatePersonDto
    | UpdateFilmDto
    | UpdateSpecieDto
    | UpdateStarshipDto
    | UpdateVehicleDto
    | UpdatePlanetDto;