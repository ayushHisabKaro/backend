import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Notification from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  create(data: DeepPartial<Notification>) {
    return this.notificationRepository.save(data);
  }

  findAll() {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .getMany();
  }

  findByUser(id: number) {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .where('user.id = :id', { id })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  updatSeenMany(ids: number[]) {
    return this.notificationRepository.update(ids, { seen: true });
  }

  removeByUser(id: number) {
    return this.notificationRepository.delete({ user: { id } });
  }
  remove() {
    return this.notificationRepository.delete({});
  }
}
