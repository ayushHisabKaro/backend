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
export default class PayrollDefault {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.payrollDefault, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  staff: Staff;

  @Column({ type: 'float' })
  salary: number;

  @Column({ default: 0, type: 'float' })
  hra: number;

  @Column({ default: 0, type: 'float' })
  specialAllowance: number;

  @Column({ default: 0, type: 'float' })
  bonus: number;

  @Column({ default: 0, type: 'float' })
  nightAllowance: number;

  @Column({ default: 0, type: 'float' })
  overTime: number;

  @Column({ default: 0, type: 'float' })
  otherAddition: number;

  @Column({ default: 0, type: 'float' })
  pf: number;

  @Column({ default: 0, type: 'float' })
  esi: number;

  @Column({ default: 0, type: 'float' })
  tds: number;

  @Column({ default: 0, type: 'float' })
  otherDeduction: number;

  @Column()
  month: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
