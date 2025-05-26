import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "../../people/entities/person.entity";
import {Film} from "../../films/entities/film.entity";
import {Starship} from "../../starships/entities/starship.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";
import {Specie} from "../../species/entities/specie.entity";
import {Planet} from "../../planets/entities/planet.entity";

@Entity("images")
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string

    @Column()
    url: string = ''

    @ManyToOne(() => Person, (person) => person.images, { onDelete: "CASCADE" })
    person: Person;

    @ManyToOne(() => Film, (film) => film.images, { onDelete: "CASCADE" })
    film: Film;

    @ManyToOne(() => Starship, (starship) => starship.images, { onDelete: "CASCADE" })
    starship: Starship;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.images, { onDelete: "CASCADE" })
    vehicle: Vehicle;

    @ManyToOne(() => Specie, (specie) => specie.images, { onDelete: "CASCADE" })
    specie: Specie;

    @ManyToOne(() => Planet, (planet) => planet.images, { onDelete: "CASCADE" })
    planet: Planet;
}
