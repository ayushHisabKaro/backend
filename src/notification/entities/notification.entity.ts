import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { notificationType } from 'src/types/entity.attribute.types';

@Entity()
export default class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  seen: boolean;

  @Column()
  title: string;

  @Column()
  type: notificationType;

  @Column()
  description: string;

  @Column({ type: 'json', nullable: true })
  details: any;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
