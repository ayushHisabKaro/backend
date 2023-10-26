import StaffAttendance from './staffAttendance.entity';
import { attendanceType } from '../../types/entity.attribute.types';
export default class AttendanceType {
    id: number;
    name: attendanceType;
    staffAttendance: StaffAttendance[];
    createdAt: Date;
}
