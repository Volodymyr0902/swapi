import type { Person } from '../../modules/people/entities/person.entity';
import type { Film } from '../../modules/films/entities/film.entity';
import type { Starship } from '../../modules/starships/entities/starship.entity';
import type { Specie } from '../../modules/species/entities/specie.entity';
import type { Planet } from '../../modules/planets/entities/planet.entity';
import type { Vehicle } from '../../modules/vehicles/entities/vehicle.entity';

export type ExistingEntity = Person | Film | Specie | Starship | Vehicle | Planet;
