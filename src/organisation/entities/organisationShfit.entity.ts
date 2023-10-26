import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import Organisation from './organisation.entity';

@Entity()
export default class OrganisationShift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  openTime: string;

  @Column({ type: 'time' })
  closeTime: string;

  @Column({ type: 'time' })
  markLateAfter: string;

  @ManyToOne(() => Organisation, (organisation) => organisation.shifts, {
    onDelete: 'CASCADE',
  })
  organisation: Organisation;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
