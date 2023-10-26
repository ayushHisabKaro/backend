import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthRequest } from '../types/AuthRequest';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    create(createResumeDto: CreateResumeDto, req: AuthRequest): Promise<import("./entities/resume.entity").Resume>;
    findMyResume(req: AuthRequest): Promise<import("./entities/resume.entity").Resume>;
    findAll(): Promise<import("./entities/resume.entity").Resume[]>;
    findByUser(id: string): Promise<import("./entities/resume.entity").Resume>;
    findOne(id: string): Promise<import("./entities/resume.entity").Resume>;
    updateByAuthUser(req: AuthRequest, updateResumeDto: UpdateResumeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
