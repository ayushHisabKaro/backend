import Staff from './staff.entity';
import StaffMonthlyAdvance from './staffMonthlyAdvance';
export default class StaffAdvance {
    id: number;
    amount: number;
    interestRate: number;
    startDate: string;
    sameMonth: boolean;
    totalMonths: number;
    monthlyAdvance: StaffMonthlyAdvance[];
    staff: Staff;
    createdAt: Date;
}
