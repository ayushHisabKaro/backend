import {
  Controller,
  Get,
  Request,
  Param,
  Delete,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthRequest } from '../types/AuthRequest';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { OrganisationService } from '../organisation/organisation.service';
import { Roles } from '../types/entity.attribute.types';

@ApiTags('Notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly organisationService: OrganisationService,
  ) {}

  // @Post()
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  @Get()
  findByAuthuser(@Request() req: AuthRequest) {
    return this.notificationService.findByUser(req.user.id);
  }
  @Get('organisationBranch/:id')
  async findByOrganisationBrance(
    @Request() req: AuthRequest,
    @Param('id') id: string,
  ) {
    const organisationBranchId = id === 'undefined' ? 0 : +id;
    const notifications = await this.notificationService.findByUser(
      +req.user.id,
    );
    const isBusiness = req.user.role.name === Roles.BUSINESS;
    const requests =
      await this.organisationService.findManyOrganisationJoinRequest(
        organisationBranchId,
      );
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

  @Get('all')
  findAll(@Request() req: AuthRequest) {
    return this.notificationService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationService.findOne(+id);
  // }

  @Patch('/seen/')
  async update(@Body() updateNotificationDto: UpdateNotificationDto) {
    if (updateNotificationDto.orgRequestIds) {
      await this.organisationService.updatJoinReqSeenMany(
        updateNotificationDto.orgRequestIds,
      );
    }
    return await this.notificationService.updatSeenMany(
      updateNotificationDto.ids,
    );
  }

  @Delete()
  removeByAuthuser(@Request() req: AuthRequest) {
    return this.notificationService.removeByUser(req.user.id);
  }

  @Delete('all')
  remove() {
    return this.notificationService.remove();
  }
}
