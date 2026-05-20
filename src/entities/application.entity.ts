import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Mother } from './mother.entity';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mother_id' })
  motherId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ name: 'reviewer_mother_id', nullable: true })
  reviewerMotherId?: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 30, default: 'pending' })
  status: string;

  @Column({ name: 'availability_notes', type: 'text', nullable: true })
  availabilityNotes?: string;

  @Column({ name: 'interview_scheduled_at', type: 'datetime', nullable: true })
  interviewScheduledAt?: Date;

  @ManyToOne(() => Mother, (mother) => mother.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mother_id' })
  mother: Mother;

  @ManyToOne(() => Group, (group) => group.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Mother, (mother) => mother.reviewedApplications, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewer_mother_id' })
  reviewer?: Mother;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
