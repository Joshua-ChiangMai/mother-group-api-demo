import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { GroupMeeting } from './group-meeting.entity';
import { GroupMembership } from './group-membership.entity';
import { Mother } from './mother.entity';

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'leader_mother_id' })
  leaderMotherId: number;

  @Column({ name: 'location_region', length: 1 })
  locationRegion: string;

  @Column({ type: 'int', default: 12 })
  capacity: number;

  @ManyToOne(() => Mother, (mother) => mother.ledGroups, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'leader_mother_id' })
  leader: Mother;

  @OneToMany(() => GroupMeeting, (meeting) => meeting.group)
  meetings: GroupMeeting[];

  @OneToMany(() => Application, (application) => application.group)
  applications: Application[];

  @OneToMany(() => GroupMembership, (membership) => membership.group)
  memberships: GroupMembership[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
