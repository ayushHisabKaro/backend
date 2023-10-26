import { Resume } from '../../resume/entities/resume.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Role from './role.entity';
import Organisation from '../../organisation/entities/organisation.entity';
import OrganisationPartner from '../../organisation/entities/organisationPartner.entity';
import UserLanguage from './UserLanguage';
import JobApplied from '../../hiring/entities/jobApplied.entity';
import JobBookmarked from '../../hiring/entities/jobBookmark.entity';
import JobShortlisted from '../../hiring/entities/jobShortlisted.entity';
import Notification from '../../notification/entities/notification.entity';
import Staff from '../../staff/entities/staff.entity';
import StaffAttendance from '../../staff/entities/staffAttendance.entity';
import OrganisationJoinRequest from '../../organisation/entities/organisationJoinRequest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Resume, (resume) => resume.user)
  resume: Resume;

  @OneToMany(() => Organisation, (organisation) => organisation.createdBy)
  organisations: Organisation[];

  @OneToMany(
    () => OrganisationPartner,
    (organisationPartner) => organisationPartner.user,
  )
  organisationPartner: OrganisationPartner[];

  @Column({ nullable: true })
  email: string;

  // @Column({ unique: true, select: false })
  // password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  alternatePhoneNumber: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => UserLanguage, (language) => language.users)
  language: UserLanguage;

  @Column({ nullable: true })
  appVersion: number;

  @Column({ nullable: true })
  deviceName: string;

  @OneToMany(() => Staff, (staff) => staff.user)
  staff: Staff[];

  @OneToMany(() => JobApplied, (jobApplied) => jobApplied.user)
  jobsApplied: JobApplied[];

  @OneToMany(() => JobBookmarked, (jobBookmarked) => jobBookmarked.user)
  jobsBookmarked: JobBookmarked[];

  @OneToMany(() => JobShortlisted, (jobShortlisted) => jobShortlisted.user)
  jobsShortlisted: JobShortlisted[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(
    () => OrganisationJoinRequest,
    (organisationJoinRequest) => organisationJoinRequest.user,
  )
  organisationJoinRequest: OrganisationJoinRequest[];

  @OneToMany(() => StaffAttendance, (attendance) => attendance.markedBy)
  marksAttendance: StaffAttendance[];

  @Column({ nullable: true })
  lastActive: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // @BeforeInsert()
  // async setPassword() {
  //   if (this.password) {
  //     const hashPassword = await hash(this.password, 12);
  //     this.password = hashPassword;
  //   }
  // }

  // @BeforeUpdate()
  // async updatePassword() {
  //   if (this.password) {
  //     const hashPassword = await hash(this.password, 12);
  //     this.password = hashPassword;
  //   }
  // }
}
