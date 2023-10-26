import { attendanceType } from 'src/types/entity.attribute.types';
export declare class CreateAttendanceDto {
    photoUrl: string;
    lat: number;
    lng: number;
    address: string;
    attendanceType: attendanceType;
}
export declare class UpdateAttendanceDto {
    attendanceType: attendanceType;
}
export declare class GetAttendanceDto {
    staffId: number;
    start: string;
    end: string;
}
