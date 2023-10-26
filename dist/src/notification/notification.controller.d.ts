import { NotificationService } from './notification.service';
import { AuthRequest } from '../types/AuthRequest';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { OrganisationService } from '../organisation/organisation.service';
export declare class NotificationController {
    private readonly notificationService;
    private readonly organisationService;
    constructor(notificationService: NotificationService, organisationService: OrganisationService);
    findByAuthuser(req: AuthRequest): Promise<import("./entities/notification.entity").default[]>;
    findByOrganisationBrance(req: AuthRequest, id: string): Promise<{
        notifications: import("./entities/notification.entity").default[];
        requests: import("../organisation/entities/organisationJoinRequest.entity").default[];
        pending: boolean;
        pendingAmount: number;
    }>;
    findAll(req: AuthRequest): Promise<import("./entities/notification.entity").default[]>;
    update(updateNotificationDto: UpdateNotificationDto): Promise<import("typeorm").UpdateResult>;
    removeByAuthuser(req: AuthRequest): Promise<import("typeorm").DeleteResult>;
    remove(): Promise<import("typeorm").DeleteResult>;
}
