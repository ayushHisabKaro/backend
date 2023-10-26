import { User } from './user.entity';
export default class Role {
    id: number;
    name: string;
    users: User[];
    createdAt: Date;
}
