import { User } from '../../user/entities/user.entity';
import Job from './job.entity';
export default class JobShortlisted {
    id: number;
    user: User;
    job: Job;
    isRejected: boolean;
    createdAt: Date;
}
