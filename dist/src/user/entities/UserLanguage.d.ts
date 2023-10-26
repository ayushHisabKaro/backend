import { User } from './user.entity';
export default class UserLanguage {
    id: number;
    code: string;
    name: string;
    users: User[];
    createdAt: Date;
}
