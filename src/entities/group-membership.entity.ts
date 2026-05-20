import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Mother } from './mother.entity';

@Entity({ name: 'group_memberships' })
@Unique(['motherId', 'groupId'])
export class GroupMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mother_id' })
  motherId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ name: 'joined_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @ManyToOne(() => Mother, (mother) => mother.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mother_id' })
  mother: Mother;

  @ManyToOne(() => Group, (group) => group.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
