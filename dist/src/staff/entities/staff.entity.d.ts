import { User } from '../../user/entities/user.entity';
import Organisation from '../../organisation/entities/organisation.entity';
import OrganisationBranch from 'src/organisation/entities/organisationBranch.entity';
import StaffAdvance from './staffAdvance.entity';
import StaffAttendance from './staffAttendance.entity';
import PayrollApplied from './payrollApplied.entity';
import PayrollDefault from './payrollDefault.entity';
import StaffWeeklyOff from './staffWeeklyOff.entity';
export default class Staff {
    id: number;
    user: User;
    attendance: StaffAttendance[];
    advance: StaffAdvance[];
    organisation: Organisation;
    organisationBranch: OrganisationBranch;
    name: string;
    phoneNumber: string;
    salaryInterval: string;
    openTime: string;
    closeTime: string;
    markLateAfter: string;
    weeklyOff: StaffWeeklyOff[];
    weekelyOffTillNow: number;
    pin: string;
    companyMobileNumber: string;
    department: string;
    joiningDate: string;
    mobileHandset: string;
    laptop: string;
    otherInformation: string;
    payrollDefault: PayrollDefault[];
    payrollApplied: PayrollApplied[];
    createdAt: Date;
}