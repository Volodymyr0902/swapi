import type { CreatePersonDto } from '../../modules/people/dto/create-person.dto';
import type { CreateFilmDto } from '../../modules/films/dto/create-film.dto';
import type { CreatePlanetDto } from '../../modules/planets/dto/create-planet.dto';
import type { CreateStarshipDto } from '../../modules/starships/dto/create-starship.dto';
import type { CreateSpecieDto } from '../../modules/species/dto/create-specie.dto';
import type { CreateVehicleDto } from '../../modules/vehicles/dto/create-vehicle.dto';
import type { CreateImageDto } from '../../modules/images/dto/create-image.dto';

export type CreateDto =
  | CreatePersonDto
  | CreateFilmDto
  | CreatePlanetDto
  | CreateStarshipDto
  | CreateSpecieDto
  | CreateVehicleDto
  | CreateImageDto;
