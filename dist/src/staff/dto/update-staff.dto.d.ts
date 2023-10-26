import { CreateStaffDto } from './create-staff.dto';
declare const UpdateStaffDto_base: import("@nestjs/common").Type<Partial<CreateStaffDto>>;
export declare class UpdateStaffDto extends UpdateStaffDto_base {
    weeklyOffMonth?: string;
    companyMobileNumber?: string;
    department?: string;
    joiningDate?: string;
    mobileHandset?: string;
    laptop?: string;
    otherInformation?: string;
}
export declare class UpdateWeeklyOffDto {
    weekelyOff1: number;
    weekelyOff2: number;
    month: string;
}
export {};
