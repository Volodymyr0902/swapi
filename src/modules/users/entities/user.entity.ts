import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Transform(({ value }) => value.map((role: Role) => role.name))
  @ManyToMany(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  roles: Role[];
}
