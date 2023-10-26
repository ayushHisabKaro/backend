import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  resourceId: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
