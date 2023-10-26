import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import OrganisationBranch from './organisationBranch.entity';

@Entity()
export default class OrganisationJoinRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  seen: boolean;

  @ManyToOne(() => User, (user) => user.organisationJoinRequest, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => OrganisationBranch,
    (organisation) => organisation.organisationJoinRequest,
    {
      onDelete: 'CASCADE',
    },
  )
  organisationBranch: OrganisationBranch;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
