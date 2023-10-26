import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
