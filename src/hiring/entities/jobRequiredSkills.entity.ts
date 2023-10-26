import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Job from './job.entity';

@Entity()
export class JobRequiredSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Job, (job) => job.requiredSkills, { onDelete: 'CASCADE' })
  job: Job;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
