import { Resume } from './resume.entity';
export default class ResumeEducation {
    id: number;
    education: string;
    from: string;
    to: string;
    resume: Resume;
    createdAt: Date;
}
