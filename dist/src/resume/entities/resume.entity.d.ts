import { User } from '../../user/entities/user.entity';
import { ResumeLanguage } from './resumeLanguage.entity';
import { ResumeSkill } from './resumeSkills.entity';
import { ResumeDocument } from './resumeDocument.entity';
import { SalaryIntervalsType } from '../../types/entity.attribute.types';
import ResumeWorkExperience from './resumeWorkExperience';
import ResumeEducation from './resumeEducation.entity';
export declare class Resume {
    id: number;
    user: User;
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
    otherLanguages: ResumeLanguage[];
    workExperience: ResumeWorkExperience[];
    skills: ResumeSkill[];
    highestEducation: string;
    documents: ResumeDocument[];
    education: ResumeEducation[];
    createdAt: Date;
}
