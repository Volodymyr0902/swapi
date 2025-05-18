import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Image} from "../../images/entities/image.entity";
import {Vehicle} from "../../vehicles/entities/vehicle.entity";
import {Person} from "../../people/entities/person.entity";
import {Film} from "../../films/entities/film.entity";

@Entity("species")
export class Specie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    designation: string;

    @Column()
    average_height: string;

    @Column()
    average_lifespan: string;

    @Column({default: "none"})
    eye_colors: string;

    @Column({default: "none"})
    hair_colors: string;

    @Column({default: "none"})
    skin_colors: string;

    @Column()
    language: string;

    @Column()
    homeworld: string;

    @ManyToMany(() => Person, (person) => person.species, {onDelete: "CASCADE"})
    people: Person[];

    @ManyToMany(() => Film, (film) => film.species, {onDelete: "CASCADE"})
    films: Film[];

    @OneToMany(() => Image, (image) => image.specie)
    images: Image[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    edited: Date;
}
