import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import StaffAttendance from './staffAttendance.entity';
import { attendanceType } from '../../types/entity.attribute.types';

@Entity()
export default class AttendanceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: attendanceType;

  @OneToMany(
    () => StaffAttendance,
    (staffAttendance) => staffAttendance.attendanceType,
  )
  staffAttendance: StaffAttendance[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
