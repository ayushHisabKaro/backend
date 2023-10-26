import { SalaryIntervalsType } from '../../types/entity.attribute.types';
export declare class CreateResumeLanguage {
    id?: number;
    name: string;
}
export declare class CreateResumeEducationDto {
    education: string;
    from: string;
    to: string;
}
export declare class CreateResumeSkills {
    id?: number;
    name: string;
}
export declare class CreateResumeDocument {
    id?: number;
    name: string;
    url: string;
}
export declare class CreateResumeWorkExperience {
    id?: number;
    jobTitle: string;
    company: string;
    sector: string;
    from: Date;
    to: Date;
}
export declare class CreateResumeDto {
    phoneNumber: string;
    email: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
    currentSalary: number;
    currentSalaryInterval: SalaryIntervalsType;
    currentSalaryVisibility: boolean;
    englishLevel: string;
    otherLanguages: CreateResumeLanguage[];
    skills: CreateResumeSkills[];
    documents: CreateResumeDocument[];
    workExperience: CreateResumeWorkExperience[];
    education: CreateResumeEducationDto[];
    highestEducation: string;
}
