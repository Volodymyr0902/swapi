import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinTable
} from "typeorm";
import {Image} from "../../images/entities/image.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";
import {Specie} from "../../species/entities/specie.entity";
import {Starship} from "../../starships/entities/starship.entity";
import {Person} from "../../people/entities/person.entity";
import {Planet} from "../../planets/entities/planet.entity";

@Entity("films")
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("integer")
    episode_id: number;

    @Column()
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column("date")
    release_date: Date;

    @ManyToMany(() => Specie, (specie) => specie.films, {onDelete: "CASCADE"})
    @JoinTable({
        name: "films_species",
        joinColumn: {name: "film_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "specie_id", referencedColumnName: "id"}
    })
    species: Specie[];

    @ManyToMany(() => Starship, (starship) => starship.films, {onDelete: "CASCADE"})
    @JoinTable({
        name: "films_starships",
        joinColumn: {name: "film_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "starship_id", referencedColumnName: "id"}
    })
    starships: Starship[];

    @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, {onDelete: "CASCADE"})
    @JoinTable({
        name: "films_vehicles",
        joinColumn: {name: "film_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "vehicle_id", referencedColumnName: "id"}
    })
    vehicles: Vehicle[];

    @ManyToMany(() => Person, (person) => person.films, {onDelete: "CASCADE"})
    @JoinTable({
        name: "films_people",
        joinColumn: {name: "film_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "person_id", referencedColumnName: "id"}
    })
    characters: Person[];

    @ManyToMany(() => Planet, (planet) => planet.films, {onDelete: "CASCADE"})
    @JoinTable({
        name: "films_planets",
        joinColumn: {name: "film_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "planet_id", referencedColumnName: "id"}
    })
    planets: Planet[];

    @OneToMany(() => Image, (image) => image.film)
    images: Image[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    edited: Date;
}
