import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { JobOtherLanguage } from './jobOtherLanguage.entity';
import { JobRequiredSkill } from './jobRequiredSkills.entity';
import { JobExperienceRequired } from './jobExperienceRequired.entity';
import Organisation from '../../organisation/entities/organisation.entity';
import OrganisationBranch from '../../organisation/entities/organisationBranch.entity';
import JobApplied from './jobApplied.entity';
import JobBookmarked from './jobBookmark.entity';
import JobShortlisted from './jobShortlisted.entity';

@Entity()
export default class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Organisation, (organisation) => organisation.jobs, {
    onDelete: 'CASCADE',
  })
  organisation: Organisation;

  @ManyToOne(
    () => OrganisationBranch,
    (organisationBranch) => organisationBranch.jobs,
    { onDelete: 'CASCADE' },
  )
  organisationBranch: OrganisationBranch;

  @Column({ type: 'text' })
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  pinCode: string;

  @Column()
  landmark: string;

  @Column({ nullable: true })
  minSalary: number;

  @Column()
  minSalaryInterval: string;

  @Column({ nullable: true })
  maxSalary: number;

  @Column()
  maxSalaryInterval: string;

  @Column({ nullable: true })
  minIncentive: number;

  @Column()
  minIncentiveInterval: string;

  @Column({ nullable: true })
  maxIncentive: number;

  @Column()
  maxIncentiveInterval: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  jobTimingType: string;

  @Column({ type: 'date' })
  applyBeforeDate: Date;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => JobRequiredSkill, (jobRequiredSkill) => jobRequiredSkill.job)
  requiredSkills: JobRequiredSkill[];

  @OneToMany(
    () => JobExperienceRequired,
    (jobExperienceRequired) => jobExperienceRequired.job,
  )
  experienceRequired: JobExperienceRequired[];

  @Column()
  englishLevel: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'text' })
  comment: string;

  @Column()
  emailAddress: string;

  @Column({ default: true })
  isOpen: boolean;

  @OneToMany(() => JobOtherLanguage, (jobLanguage) => jobLanguage.job)
  otherLanguages: JobOtherLanguage[];

  @OneToMany(() => JobApplied, (jobApplied) => jobApplied.job)
  applied: JobApplied[];

  @OneToMany(() => JobBookmarked, (jobBookmarked) => jobBookmarked.job)
  bookmarked: JobBookmarked[];

  @OneToMany(() => JobShortlisted, (jobShortListed) => jobShortListed.job)
  shortlisted: JobShortlisted[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
