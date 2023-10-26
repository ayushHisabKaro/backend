import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Job from './job.entity';

@Entity()
export default class JobApplied {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.jobsApplied, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Job, (job) => job.applied, {
    onDelete: 'CASCADE',
  })
  job: Job;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
