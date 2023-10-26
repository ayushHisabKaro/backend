import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import Job from './job.entity';

@Entity()
export default class JobBookmarked {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.jobsBookmarked, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Job, (job) => job.bookmarked, {
    onDelete: 'CASCADE',
  })
  job: Job;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
