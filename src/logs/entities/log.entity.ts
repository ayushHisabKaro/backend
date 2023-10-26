import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
