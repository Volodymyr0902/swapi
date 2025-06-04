import {CreatePersonDto} from "../../modules/people/dto/create-person.dto";
import {CreateFilmDto} from "../../modules/films/dto/create-film.dto";
import {CreatePlanetDto} from "../../modules/planets/dto/create-planet.dto";
import {CreateStarshipDto} from "../../modules/starships/dto/create-starship.dto";
import {CreateSpecieDto} from "../../modules/species/dto/create-specie.dto";
import {CreateVehicleDto} from "../../modules/vehicles/dto/create-vehicle.dto";
import {CreateImageDto} from "../../modules/images/dto/create-image.dto";
import {CreateUserReqDto} from "../../modules/users/dto/create-user-req.dto";
import {CreateRoleDto} from "../../modules/roles/dto/create-role.dto";

export type CreateDto =
    | CreatePersonDto
    | CreateFilmDto
    | CreatePlanetDto
    | CreateStarshipDto
    | CreateSpecieDto
    | CreateVehicleDto
    | CreateImageDto
    | CreateUserReqDto
    | CreateRoleDto;