import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

    @Column()
    homeworld: string;

    // @Column()
    // films: string[]
    //
    // @Column()
    // species: string[];
    //
    // @Column()
    // starships: string[];
    //
    // @Column()
    // vehicles: string[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    edited: Date;
}
