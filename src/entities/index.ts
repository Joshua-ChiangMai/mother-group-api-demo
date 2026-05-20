import { Application } from './application.entity';
import { GroupMeeting } from './group-meeting.entity';
import { GroupMembership } from './group-membership.entity';
import { Group } from './group.entity';
import { Mother } from './mother.entity';
import { User } from './user.entity';

export const entities = [Mother, Group, GroupMeeting, Application, GroupMembership, User];

export { Application, Group, GroupMeeting, GroupMembership, Mother, User };
