import JobBookmarked from '../hiring/entities/jobBookmark.entity';
import Job from '../hiring/entities/job.entity';
import JobApplied from '../hiring/entities/jobApplied.entity';
import JobShortlisted from '../hiring/entities/jobShortlisted.entity';
import Staff from '../staff/entities/staff.entity';
import StaffAttendance from '../staff/entities/staffAttendance.entity';
import PayrollApplied from '../staff/entities/payrollApplied.entity';
import StaffAdvance from '../staff/entities/staffAdvance.entity';
import StaffMonthlyAdvance from '../staff/entities/staffMonthlyAdvance';

export type JobShortlistedNew = JobShortlisted;
export type JobResponse = Job & {
  shortlisted: JobShortlistedNew[] | boolean;
  isApplied?: boolean;
};
export type JobAppliedByUserType = JobApplied & { job: JobResponse };
export type JobBookmarkedByUserType = JobBookmarked & {
  job: JobResponseType;
  isApplied?: boolean;
};
export type JobResponseType = Job & {
  isApplied?: boolean;
  isBookmarked?: boolean;
};
export type WorkExperienceResponseUnit = 'month' | 'year';
export type WorkExperienceResponse = {
  value: number;
  unit: WorkExperienceResponseUnit;
};
export type GetJobAdditionalData = {
  isShortlisted?: boolean;
  workExperience?: WorkExperienceResponse;
};

export type StaffAttendanceResponse = Staff & {
  attendanceToday?: StaffAttendance;
};

export type GetStaffByOrganisationBranch = Promise<{
  totalStaff: number;
  analysis: {
    PRESENT: number;
    ABSENT: number;
    LATE_HALF_DAY: number;
    WEEKLY_OFF: number;
    PAID_LEAVE: number;
  };
  attendance: StaffAttendance[];
}>;

export type PayrollWithEnd = PayrollApplied & {
  endDate?: string;
};

export type StaffAttendanceWithCurrentPayroll = StaffAttendance & {
  staff: StaffWithCurrentPayroll;
};

export type StaffWithCurrentPayroll = Staff & {
  currentPayroll?: PayrollApplied;
  attendance: StaffAttendanceWithCurrentPayroll[];
};

export type JobShortlistedResponseType = JobShortlisted & GetJobAdditionalData;
export type JobAppliedResponse = JobApplied & GetJobAdditionalData;
export type JobBookmarkedResponse = JobBookmarked & GetJobAdditionalData;

export type AttendanceSummaryStaff = {
  analysis: {
    PRESENT: number;
    ABSENT: number;
    LATE_HALF_DAY: number;
    WEEKLY_OFF: number;
    PAID_LEAVE: number;
    weeklyOff: {
      total: number;
      spent: number;
    };
  };
  requiredAttendanceThisMonth: number;
  attendance: StaffAttendance[];
  daysInMonth: number;
};
export type AttendanceSummaryOrganisation = {
  totalStaff: number;
  analysis: {
    PRESENT: number;
    ABSENT: number;
    LATE_HALF_DAY: number;
    WEEKLY_OFF: number;
    PAID_LEAVE: number;
    weeklyOff: {
      total: number;
      spent: number;
    };
  };
  requiredAttendanceThisMonth: number;
  requiredAttendanceThisDay: number;
  attendance: StaffAttendance[];
  daysInMonth: number;
};

export type PayrollAppliedResponse = PayrollApplied & {
  currentSalary?: number;
  advance?: number;
  totalEarnings?: number;
  totalDeduction?: number;
  netAmount?: number;
  advanceDetails?: {
    advanceAfterThisMonth?: number;
    pendingTotalAdvance?: number;
    advanceThisMonth?: number;
    advancePaidThisMonth?: number;
  };
};

export type StaffResponse = Staff & {
  salary?: number;
  hra?: number;
  weeklyOff1?: number;
  weeklyOff2?: number;
};

export type StaffMonthlyAdvanceWithPaid = StaffMonthlyAdvance & {
  paid?: boolean;
  paidAmount?: number;
};

export type StaffAdvanceWithPaid = StaffAdvance & {
  monthlyAdvance: StaffMonthlyAdvanceWithPaid[];
  paidAmount?: number;
  totalAmount?: number;
  pendingAmount?: number;
  nextDue?: string;
};

export type MonthDetails = {
  start: Date;
  end: Date;
  month: number;
  daysInMonth: number;
  monthString: string;
  year: number;
  monthYear: number;
  previousMonth: Date;
};

export type PayrollSummary = {
  staffList: {
    staff: StaffResponse;
    payrollApplied: PayrollAppliedResponse;
  }[];
  totalPayableSalary: number;
  totalAdvance: number;
};

export type PayrollSummaryResponse = PayrollSummary & {
  lastMonthSummary: PayrollSummary;
};
