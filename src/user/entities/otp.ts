import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  otp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
