import StaffAdvance from './staffAdvance.entity';
import StaffMonthlyAdvancePayment from './staffMonthlyAdvancePayment';
export default class StaffMonthlyAdvance {
    id: number;
    staffAdvance: StaffAdvance;
    amount: number;
    month: string;
    monthlyAdvancePayment: StaffMonthlyAdvancePayment[];
    createdAt: Date;
}
