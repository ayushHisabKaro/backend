import { User } from '../../user/entities/user.entity';
import AttendanceType from './attendanceType.entity';
import Staff from './staff.entity';
export default class StaffAttendance {
    id: number;
    staff: Staff;
    markedBy: User;
    photoUrl: string;
    lat: number;
    lng: number;
    address: string;
    attendanceType: AttendanceType;
    createdAt: Date;
    updatedAt: Date;
}
