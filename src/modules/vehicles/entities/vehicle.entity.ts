import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { Film } from '../../films/entities/film.entity';
import { Person } from '../../people/entities/person.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  vehicle_class: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column()
  cost_in_credits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Film, (film) => film.vehicles, { onDelete: 'CASCADE' })
  films: Film[];

  @ManyToMany(() => Person, (person) => person.vehicles, {
    onDelete: 'CASCADE',
  })
  pilots: Person[];

  @OneToMany(() => Image, (image) => image.vehicle)
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;
}
