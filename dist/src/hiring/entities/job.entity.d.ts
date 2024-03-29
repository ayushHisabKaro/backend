import { JobOtherLanguage } from './jobOtherLanguage.entity';
import { JobRequiredSkill } from './jobRequiredSkills.entity';
import { JobExperienceRequired } from './jobExperienceRequired.entity';
import Organisation from '../../organisation/entities/organisation.entity';
import OrganisationBranch from '../../organisation/entities/organisationBranch.entity';
import JobApplied from './jobApplied.entity';
import JobBookmarked from './jobBookmark.entity';
import JobShortlisted from './jobShortlisted.entity';
export default class Job {
    id: number;
    title: string;
    organisation: Organisation;
    organisationBranch: OrganisationBranch;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
    minSalary: number;
    minSalaryInterval: string;
    maxSalary: number;
    maxSalaryInterval: string;
    minIncentive: number;
    minIncentiveInterval: string;
    maxIncentive: number;
    maxIncentiveInterval: string;
    startTime: string;
    endTime: string;
    jobTimingType: string;
    applyBeforeDate: Date;
    description: string;
    requiredSkills: JobRequiredSkill[];
    experienceRequired: JobExperienceRequired[];
    englishLevel: string;
    phoneNumber: string;
    comment: string;
    emailAddress: string;
    isOpen: boolean;
    otherLanguages: JobOtherLanguage[];
    applied: JobApplied[];
    bookmarked: JobBookmarked[];
    shortlisted: JobShortlisted[];
    createdAt: Date;
}
