import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class Lookup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
