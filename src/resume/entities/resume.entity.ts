import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResumeLanguage } from './resumeLanguage.entity';
import { ResumeSkill } from './resumeSkills.entity';
import { ResumeDocument } from './resumeDocument.entity';
import { SalaryIntervalsType } from '../../types/entity.attribute.types';
import ResumeWorkExperience from './resumeWorkExperience';
import ResumeEducation from './resumeEducation.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  pinCode: string;

  @Column()
  landmark: string;

  @Column({ nullable: true })
  currentSalary: number;

  @Column({ nullable: true })
  currentSalaryInterval: SalaryIntervalsType;

  @Column()
  currentSalaryVisibility: boolean;

  @Column({ nullable: true })
  englishLevel: string;

  @OneToMany(() => ResumeLanguage, (resumeLanguage) => resumeLanguage.resume)
  otherLanguages: ResumeLanguage[];

  @OneToMany(
    () => ResumeWorkExperience,
    (resumeWorkExperience) => resumeWorkExperience.resume,
  )
  workExperience: ResumeWorkExperience[];

  @OneToMany(() => ResumeSkill, (resumeSkills) => resumeSkills.resume)
  skills: ResumeSkill[];

  @Column({ nullable: true })
  highestEducation: string;

  @OneToMany(() => ResumeDocument, (resumeDocument) => resumeDocument.resume)
  documents: ResumeDocument[];

  @OneToMany(() => ResumeEducation, (resumeEducation) => resumeEducation.resume)
  education: ResumeEducation[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
