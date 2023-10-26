import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './resume.entity';

@Entity()
export class ResumeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Resume, (resume) => resume.documents, {
    onDelete: 'CASCADE',
  })
  resume: Resume;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
