import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import StaffAdvance from './staffAdvance.entity';
import StaffMonthlyAdvancePayment from './staffMonthlyAdvancePayment';

@Entity()
export default class StaffMonthlyAdvance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StaffAdvance, (staffAdvance) => staffAdvance.monthlyAdvance)
  staffAdvance: StaffAdvance;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  month: string;

  @OneToMany(
    () => StaffMonthlyAdvancePayment,
    (StaffMonthlyAdvancePayment) =>
      StaffMonthlyAdvancePayment.staffMonthlyAdvance,
  )
  monthlyAdvancePayment: StaffMonthlyAdvancePayment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
