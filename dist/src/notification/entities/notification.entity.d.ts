import { User } from '../../user/entities/user.entity';
import { notificationType } from 'src/types/entity.attribute.types';
export default class Notification {
    id: number;
    seen: boolean;
    title: string;
    type: notificationType;
    description: string;
    details: any;
    user: User;
    createdAt: Date;
}
