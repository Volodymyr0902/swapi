import {Person} from "../../people/entities/person.entity";
import {Film} from "../../films/entities/film.entity";
import {Starship} from "../../starships/entities/starship.entity";
import {Specie} from "../../species/entities/specie.entity";
import {Planet} from "../../planets/entities/planet.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";

export type ExistingEntity = Person | Film | Specie | Starship | Vehicle | Planet;