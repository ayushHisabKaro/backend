import { DeepPartial, Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Notification from './entities/notification.entity';
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(data: DeepPartial<Notification>): Promise<DeepPartial<Notification> & Notification>;
    findAll(): Promise<Notification[]>;
    findByUser(id: number): Promise<Notification[]>;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    updatSeenMany(ids: number[]): Promise<import("typeorm").UpdateResult>;
    removeByUser(id: number): Promise<import("typeorm").DeleteResult>;
    remove(): Promise<import("typeorm").DeleteResult>;
}
