import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import AttendanceType from './attendanceType.entity';
import Staff from './staff.entity';

@Entity()
export default class StaffAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.attendance, { onDelete: 'CASCADE' })
  staff: Staff;

  @ManyToOne(() => User, (user) => user.marksAttendance)
  markedBy: User;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: 'double', nullable: true })
  lat: number;

  @Column({ type: 'double', nullable: true })
  lng: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @ManyToOne(
    () => AttendanceType,
    (attendanceType) => attendanceType.staffAttendance,
  )
  attendanceType: AttendanceType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
