import Staff from './staff.entity';
export default class PayrollApplied {
    id: number;
    staff: Staff;
    salary: number;
    hra: number;
    specialAllowance: number;
    bonus: number;
    nightAllowance: number;
    overTime: number;
    otherAddition: number;
    pf: number;
    esi: number;
    tds: number;
    otherDeduction: number;
    month: string;
    createdAt: Date;
    updatedAt: Date;
}
