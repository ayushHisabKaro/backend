import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import StaffMonthlyAdvance from './staffMonthlyAdvance';

@Entity()
export default class StaffMonthlyAdvancePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => StaffMonthlyAdvance,
    (staffMonthlyAdvance) => staffMonthlyAdvance.monthlyAdvancePayment,
  )
  staffMonthlyAdvance: StaffMonthlyAdvance;

  @Column({ type: 'float' })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
