import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export default class ResumeEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  education: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @ManyToOne(() => Resume, (resume) => resume.education, {
    onDelete: 'CASCADE',
  })
  resume: Resume;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
