import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export default class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.language)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
