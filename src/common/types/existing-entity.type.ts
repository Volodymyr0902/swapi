import {Person} from "../../modules/people/entities/person.entity";
import {Film} from "../../modules/films/entities/film.entity";
import {Starship} from "../../modules/starships/entities/starship.entity";
import {Specie} from "../../modules/species/entities/specie.entity";
import {Planet} from "../../modules/planets/entities/planet.entity";
import {Vehicle} from "../../modules/vehicles/entities/vehicle.entity";
import {Role} from "../../modules/roles/entities/role.entity";
import {User} from "../../modules/users/entities/user.entity";

export type ExistingEntity = Person | Film | Specie | Starship | Vehicle | Planet | User | Role;