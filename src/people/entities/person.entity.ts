import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Image} from "../../images/entities/image.entity";
import {Film} from "../../films/entities/film.entity";
import {Specie} from "../../species/entities/specie.entity";
import {Starship} from "../../starships/entities/starship.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";
import {Planet} from "../../planets/entities/planet.entity";

@Entity("people")
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birth_year: string;

    @Column()
    eye_color: string;

    @Column()
    gender: string;

    @Column()
    hair_color: string;

    @Column()
    height: string;

    @Column()
    mass: string;

    @Column()
    skin_color: string;

    @ManyToOne(() => Planet, (planet) => planet.residents, {onDelete: "CASCADE", eager: true})
    homeworld: Planet;

    @ManyToMany(() => Film, (film) => film.characters, {onDelete: "CASCADE"})
    films: Film[]

    @ManyToMany(() => Specie, (specie) => specie.people, {onDelete: "CASCADE"})
    @JoinTable({
        name: 'people_species',
        joinColumn: {name: "person_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "specie_id", referencedColumnName: "id"}
    })
    species: Specie[];

    @ManyToMany(() => Starship, (starship) => starship.pilots, {onDelete: "CASCADE"})
    @JoinTable({
        name: 'people_starships',
        joinColumn: {name: "person_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "starship_id", referencedColumnName: "id"}
    })
    starships: Starship[];

    @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots, {onDelete: "CASCADE"})
    @JoinTable({
        name: 'people_vehicles',
        joinColumn: {name: "person_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "vehicle_id", referencedColumnName: "id"}
    })
    vehicles: Vehicle[];

    @OneToMany(() => Image, (image) => image.person)
    images: Image[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    edited: Date;
}
