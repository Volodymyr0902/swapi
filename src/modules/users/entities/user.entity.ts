import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  roles: Role[];

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;
}
