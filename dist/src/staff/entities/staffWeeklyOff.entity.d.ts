import Staff from './staff.entity';
export default class StaffWeeklyOff {
    id: number;
    staff: Staff;
    weeklyOff1: number;
    weeklyOff2: number;
    month: string;
    createdAt: Date;
    updatedAt: Date;
}
