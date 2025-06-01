import type { UpdatePersonDto } from '../../modules/people/dto/update-person.dto';
import type { UpdateFilmDto } from '../../modules/films/dto/update-film.dto';
import type { UpdateSpecieDto } from '../../modules/species/dto/update-specie.dto';
import type { UpdateStarshipDto } from '../../modules/starships/dto/update-starship.dto';
import type { UpdateVehicleDto } from '../../modules/vehicles/dto/update-vehicle.dto';
import type { UpdatePlanetDto } from '../../modules/planets/dto/update-planet.dto';

export type UpdateDto =
  | UpdatePersonDto
  | UpdateFilmDto
  | UpdateSpecieDto
  | UpdateStarshipDto
  | UpdateVehicleDto
  | UpdatePlanetDto;
