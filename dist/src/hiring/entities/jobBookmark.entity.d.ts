import { User } from 'src/user/entities/user.entity';
import Job from './job.entity';
export default class JobBookmarked {
    id: number;
    user: User;
    job: Job;
    createdAt: Date;
}
