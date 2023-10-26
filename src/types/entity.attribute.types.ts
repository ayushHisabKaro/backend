export enum Roles {
  BUSINESS = 'BUSINESS',
  EMPLOYEE = 'EMPLOYEE',
}

export type roleType = 'BUSINESS' | 'EMPLOYEE';

export enum SalaryIntervals {
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}

export type SalaryIntervalsType = 'month' | 'week' | 'day';

export enum LogTypes {
  OTP = 'OTP',
  ATTENDANCE = 'ATTENDANCE',
  updateWeeklyOffTillNow = 'updateWeeklyOffTillNow',
  OTHER = 'OTHER',
}

export type logType = 'OTP' | 'OTHER' | 'updateWeeklyOffTillNow';

export type notificationType =
  | ''
  | 'Shortlisted'
  | 'Rejected'
  | 'Staff Added'
  | 'PayrollUpdate'
  | 'AdvancePaid';

export enum notificationTypes {
  Shortlisted = 'Shortlisted',
  Rejected = 'Rejected',
  Staff_Added = 'Staff Added',
}

export enum attendanceTypes {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE_HALF_DAY = 'LATE_HALF_DAY',
  WEEKLY_OFF = 'WEEKLY_OFF',
  PAID_LEAVE = 'PAID_LEAVE',
  PRESENT_PLUS_FULL_OVERTIME = 'PRESENT_PLUS_FULL_OVERTIME',
  PRESENT_PLUS_HALF_OVERTIME = 'PRESENT_PLUS_HALF_OVERTIME',
  CARRY_FORWARD = 'CARRY_FORWARD',
}

export type attendanceType =
  | 'PRESENT'
  | 'ABSENT'
  | 'LATE_HALF_DAY'
  | 'WEEKLY_OFF'
  | 'PAID_LEAVE'
  | 'PRESENT_PLUS_FULL_OVERTIME'
  | 'PRESENT_PLUS_HALF_OVERTIME'
  | 'CARRY_FORWARD';

export default {
  Roles,
};
