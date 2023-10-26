import Staff from '../../staff/entities/staff.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import Job from '../../hiring/entities/job.entity';
import Organisation from './organisation.entity';
import OrganisationJoinRequest from './organisationJoinRequest.entity';

@Unique(['code'])
@Entity()
export default class OrganisationBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @OneToMany(() => Staff, (staff) => staff.user)
  staff: Staff[];

  @ManyToOne(() => Organisation, (organisation) => organisation.branch, {
    onDelete: 'CASCADE',
  })
  organisation: Organisation;

  @OneToMany(() => Job, (job) => job.organisationBranch)
  jobs: Job[];

  @Column({ nullable: true })
  code: string;

  @OneToMany(
    () => OrganisationJoinRequest,
    (organisationJoinRequest) => organisationJoinRequest.organisationBranch,
  )
  organisationJoinRequest: OrganisationJoinRequest[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
