import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export type jobsShortByTypes =
  | 'recent_to_old'
  | 'old_to_recent'
  | 'high_to_low_salary'
  | 'low_to_high_salary';

export const jobsSortByValues = [
  'recent_to_old',
  'old_to_recent',
  'high_to_low_salary',
  'low_to_high_salary',
];
export type staffShortByTypes =
  | 'viewAll'
  | 'high_to_low_salary'
  | 'low_to_high_salary';

export const staffSortByValues = [
  'viewAll',
  ,
  'high_to_low_salary',
  'low_to_high_salary',
];

export type jobFilterType = {
  sort: jobsShortByTypes;
  organisationName: string;
  organisationIndustrySector: string;
  jobTitle: string;
  jobAddress: string;
  jobState: string;
  jobCity: string;
  jobPinCode: string;
  jobLandmark: string;
  branchName: string;
  branchAddress: string;
  branchState: string;
  branchCity: string;
  branchPinCode: string;
  branchLandmark: string;
  location: string;
  searchAll: string;
};
