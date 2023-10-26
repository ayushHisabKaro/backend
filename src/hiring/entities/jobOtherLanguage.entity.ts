import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Job from './job.entity';

@Entity()
export class JobOtherLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Job, (job) => job.otherLanguages, { onDelete: 'CASCADE' })
  job: Job;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
