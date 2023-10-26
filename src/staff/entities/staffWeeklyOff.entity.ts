import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import Staff from './staff.entity';

@Unique(['staff', 'month'])
@Entity()
export default class StaffWeeklyOff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.weeklyOff, { onDelete: 'CASCADE' })
  @JoinColumn()
  staff: Staff;

  @Column({ nullable: true })
  weeklyOff1: number;

  @Column({ nullable: true })
  weeklyOff2: number;

  @Column()
  month: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
