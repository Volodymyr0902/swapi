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

@Entity('starships')
export class Starship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  starship_class: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column({ default: 'n/a' })
  max_atmosphering_speed: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Film, (film) => film.starships, { onDelete: 'CASCADE' })
  films: Film[];

  @ManyToMany(() => Person, (person) => person.starships, {
    onDelete: 'CASCADE',
  })
  pilots: Person[];

  @OneToMany(() => Image, (image) => image.starship)
  images: Image[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;
}
