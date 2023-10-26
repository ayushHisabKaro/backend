import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export class ResumeSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Resume, (resume) => resume.skills, { onDelete: 'CASCADE' })
  resume: Resume;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
