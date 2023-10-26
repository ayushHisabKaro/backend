import { Resume } from './resume.entity';
export default class ResumeWorkExperience {
    id: number;
    jobTitle: string;
    company: string;
    sector: string;
    from: Date;
    to: Date;
    resume: Resume;
    createdAt: Date;
}
