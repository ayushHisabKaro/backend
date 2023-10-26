"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const update_notification_dto_1 = require("./dto/update-notification.dto");
const organisation_service_1 = require("../organisation/organisation.service");
const entity_attribute_types_1 = require("../types/entity.attribute.types");
let NotificationController = class NotificationController {
    constructor(notificationService, organisationService) {
        this.notificationService = notificationService;
        this.organisationService = organisationService;
    }
    findByAuthuser(req) {
        return this.notificationService.findByUser(req.user.id);
    }
    async findByOrganisationBrance(req, id) {
        const organisationBranchId = id === 'undefined' ? 0 : +id;
        const notifications = await this.notificationService.findByUser(+req.user.id);
        const isBusiness = req.user.role.name === entity_attribute_types_1.Roles.BUSINESS;
        const requests = await this.organisationService.findManyOrganisationJoinRequest(organisationBranchId);
        const notificationsPending = !!notifications.find((n) => n.seen === false);
        const pending = isBusiness
            ? notificationsPending || !!requests.length
            : notificationsPending;
        let pendingAmount = 0;
        if (pending) {
            pendingAmount =
                notifications.filter((n) => n.seen === false).length + requests.length;
        }
        return { notifications, requests, pending, pendingAmount };
    }
    findAll(req) {
        return this.notificationService.findAll();
    }
    async update(updateNotificationDto) {
        if (updateNotificationDto.orgRequestIds) {
            await this.organisationService.updatJoinReqSeenMany(updateNotificationDto.orgRequestIds);
        }
        return await this.notificationService.updatSeenMany(updateNotificationDto.ids);
    }
    removeByAuthuser(req) {
        return this.notificationService.removeByUser(req.user.id);
    }
    remove() {
        return this.notificationService.remove();
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findByAuthuser", null);
__decorate([
    (0, common_1.Get)('organisationBranch/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findByOrganisationBrance", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('/seen/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "removeByAuthuser", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "remove", null);
NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Notification'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        organisation_service_1.OrganisationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map