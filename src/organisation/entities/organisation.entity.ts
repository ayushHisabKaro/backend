import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import OrganisationBranch from './organisationBranch.entity';
import OrganisationPartner from './organisationPartner.entity';
import Job from '../../hiring/entities/job.entity';
import OrganisationShift from './organisationShfit.entity';
import Staff from '../../staff/entities/staff.entity';

@Entity()
export default class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.organisations, { onDelete: 'CASCADE' })
  createdBy: User;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  pinCode: string;

  @Column({ nullable: true })
  landmark: string;

  @Column({ nullable: true })
  weekelyOff1: number;

  @Column({ nullable: true })
  weekelyOff2: number;

  @OneToMany(
    () => OrganisationShift,
    (organisationShift) => organisationShift.organisation,
  )
  shifts: OrganisationShift[];

  @Column({ nullable: true })
  industrySector: string;

  @OneToMany(
    () => OrganisationBranch,
    (organisationBranch) => organisationBranch.organisation,
  )
  branch: OrganisationBranch[];

  @OneToMany(() => Staff, (staff) => staff.user)
  staff: Staff[];

  @OneToMany(() => Job, (job) => job.organisation)
  jobs: Job[];

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  gstFileUrl: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ nullable: true })
  panFileUrl: string;

  @OneToMany(
    () => OrganisationPartner,
    (organisationBranch) => organisationBranch.organisation,
  )
  partners: OrganisationPartner[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
