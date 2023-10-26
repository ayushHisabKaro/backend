import { User } from '../../user/entities/user.entity';
import Job from './job.entity';
export default class JobApplied {
    id: number;
    user: User;
    job: Job;
    createdAt: Date;
}
