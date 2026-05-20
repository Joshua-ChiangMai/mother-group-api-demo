import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { GroupMembership } from './group-membership.entity';
import { Group } from './group.entity';

@Entity({ name: 'mothers' })
@Unique(['email'])
export class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ name: 'location_preference', length: 1, nullable: true })
  locationPreference?: string;

  @Column({ name: 'availability_notes', type: 'text', nullable: true })
  availabilityNotes?: string;

  @OneToMany(() => Group, (group) => group.leader)
  ledGroups: Group[];

  @OneToMany(() => Application, (application) => application.mother)
  applications: Application[];

  @OneToMany(() => Application, (application) => application.reviewer)
  reviewedApplications: Application[];

  @OneToMany(() => GroupMembership, (membership) => membership.mother)
  memberships: GroupMembership[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
