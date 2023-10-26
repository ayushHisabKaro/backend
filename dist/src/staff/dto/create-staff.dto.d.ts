import Organisation from 'src/organisation/entities/organisation.entity';
import OrganisationBranch from 'src/organisation/entities/organisationBranch.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';
export declare class CreateStaffAdvanceDto {
    amount: number;
    interestRate: number;
    startDate: string;
    sameMonth: boolean;
    totalMonths: number;
}
export declare class createMonthlyAdvance {
    amount: number;
    month: string;
}
export declare class CreateStaffDto {
    advance: CreateStaffAdvanceDto[];
    userId?: number;
    organisationId: number;
    organisationBranchId: number;
    name: string;
    phoneNumber: string;
    salary: number;
    hra: number;
    salaryInterval: string;
    openTime: string;
    closeTime: string;
    markLateAfter: string;
    weekelyOff1: number;
    weekelyOff2: number;
    specialAllowance?: number;
    Bonus?: number;
    nightAllowance?: number;
    overTime?: number;
    other?: number;
    user: DeepPartial<User>;
    organisation: DeepPartial<Organisation>;
    organisationBranch: DeepPartial<OrganisationBranch>;
}
export declare class ConnectStaffDto {
    organisationId: number;
    pin: string;
}
export declare class PayrollUpdateDto {
    date: string;
    salary: number;
    hra: number;
}
export declare class GetHomePageStaffDto {
    start: string;
    end: string;
}
export declare class CreatePaymentDto {
    monthlyAdvanceId: number;
    amount: number;
}
