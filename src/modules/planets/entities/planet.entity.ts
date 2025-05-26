import {
    Column,
    CreateDateColumn,
    Entity, ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Image} from "../../images/entities/image.entity";
import {Person} from "../../people/entities/person.entity";
import {Film} from "../../films/entities/film.entity";

@Entity("planets")
export class Planet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    diameter: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    gravity: string;

    @Column()
    population: string;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @OneToMany(() => Person, (person) => person.homeworld, {onDelete: "CASCADE"})
    residents: Person[];

    @ManyToMany(() => Film, (film) => film.planets, {onDelete: "CASCADE"})
    films: Film[];

    @OneToMany(() => Image, (image) => image.planet)
    images: Image[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    edited: Date;
}
