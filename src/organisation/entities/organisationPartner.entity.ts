import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Organisation from './organisation.entity';

@Entity()
export default class OrganisationPartner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.organisationPartner)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Organisation, (organisation) => organisation.partners, {
    onDelete: 'CASCADE',
  })
  organisation: Organisation;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
