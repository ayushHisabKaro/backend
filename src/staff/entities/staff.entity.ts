import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Organisation from '../../organisation/entities/organisation.entity';
import OrganisationBranch from 'src/organisation/entities/organisationBranch.entity';
import StaffAdvance from './staffAdvance.entity';
import StaffAttendance from './staffAttendance.entity';
import PayrollApplied from './payrollApplied.entity';
import PayrollDefault from './payrollDefault.entity';
import StaffWeeklyOff from './staffWeeklyOff.entity';

@Entity()
export default class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.staff)
  user: User;

  @OneToMany(() => StaffAttendance, (staffAttendance) => staffAttendance.staff)
  attendance: StaffAttendance[];

  @OneToMany(() => StaffAdvance, (staffAdvance) => staffAdvance.staff)
  advance: StaffAdvance[];

  @ManyToOne(() => Organisation, (organisation) => organisation.staff)
  organisation: Organisation;

  @ManyToOne(
    () => OrganisationBranch,
    (organisationBranch) => organisationBranch.staff,
  )
  organisationBranch: OrganisationBranch;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  // @Column({ nullable: true })
  // salary: number;

  // @Column({ nullable: true })
  // hra: number;

  @Column({ nullable: true })
  salaryInterval: string;

  @Column({ type: 'time', nullable: true })
  openTime: string;

  @Column({ type: 'time', nullable: true })
  closeTime: string;

  @Column({ type: 'time', nullable: true })
  markLateAfter: string;

  // @Column({ nullable: true })
  // weekelyOff1: number;

  // @Column({ nullable: true })
  // weekelyOff2: number;

  @OneToMany(() => StaffWeeklyOff, (weeklyOff) => weeklyOff.staff)
  weeklyOff: StaffWeeklyOff[];

  @Column({ default: 0 })
  weekelyOffTillNow: number;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  companyMobileNumber: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  joiningDate: string;

  @Column({ nullable: true })
  mobileHandset: string;

  @Column({ nullable: true })
  laptop: string;

  @Column({ nullable: true })
  otherInformation: string;

  @OneToMany(() => PayrollDefault, (payroll) => payroll.staff)
  payrollDefault: PayrollDefault[];

  @OneToMany(() => PayrollApplied, (payroll) => payroll.staff)
  payrollApplied: PayrollApplied[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
