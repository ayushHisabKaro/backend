export declare class CreateJobRequiredSkill {
    name: string;
}
export declare class CreateJobExperienceRequired {
    name: string;
}
export declare class CreateJobOtherLanguage {
    name: string;
}
export declare class CreateJobDto {
    title: string;
    organisationId: number;
    organisationBranchId: number;
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
    startTime: string;
    endTime: string;
    maxIncentiveInterval: string;
    jobTimingType: string;
    applyBeforeDate: Date;
    description: string;
    requiredSkills: CreateJobRequiredSkill[];
    experienceRequired: CreateJobExperienceRequired[];
    englishLevel: string;
    phoneNumber: string;
    comment: string;
    emailAddress: string;
    otherLanguages: CreateJobOtherLanguage[];
}
declare const UpdateJobDto_base: import("@nestjs/common").Type<Partial<CreateJobDto>>;
export declare class UpdateJobDto extends UpdateJobDto_base {
}
export {};
