import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Staff from './staff.entity';
import StaffMonthlyAdvance from './staffMonthlyAdvance';

@Entity()
export default class StaffAdvance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  interestRate: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column()
  sameMonth: boolean;

  @Column({ nullable: true })
  totalMonths: number;

  @OneToMany(
    () => StaffMonthlyAdvance,
    (staffMonthlyAdvance) => staffMonthlyAdvance.staffAdvance,
  )
  monthlyAdvance: StaffMonthlyAdvance[];

  @ManyToOne(() => Staff, (staff) => staff.advance, { onDelete: 'CASCADE' })
  staff: Staff;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
