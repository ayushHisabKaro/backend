import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export default class ResumeWorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  company: string;

  @Column()
  sector: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @ManyToOne(() => Resume, (resume) => resume.workExperience, {
    onDelete: 'CASCADE',
  })
  resume: Resume;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
