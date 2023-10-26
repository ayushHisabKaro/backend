import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import Job from './job.entity';

@Entity()
export default class JobShortlisted {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.jobsShortlisted, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Job, (job) => job.shortlisted, {
    onDelete: 'CASCADE',
  })
  job: Job;

  @Column({ default: false })
  isRejected: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
