import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './controllers/applications.controller';
import { buildDatabaseOptions } from './database.config';
import { GroupMeetingsController } from './controllers/group-meetings.controller';
import { GroupMembershipsController } from './controllers/group-memberships.controller';
import { GroupsController } from './controllers/groups.controller';
import { MothersController } from './controllers/mothers.controller';
import { UsersController } from './controllers/users.controller';
import { UiController } from './controllers/ui.controller';
import {
  Application,
  Group,
  GroupMeeting,
  GroupMembership,
  Mother,
  User,
} from './entities';
import { ApplicationsService } from './services/applications.service';
import { GroupMeetingsService } from './services/group-meetings.service';
import { GroupMembershipsService } from './services/group-memberships.service';
import { GroupsService } from './services/groups.service';
import { MothersService } from './services/mothers.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(buildDatabaseOptions()),
    TypeOrmModule.forFeature([
      Mother,
      Group,
      GroupMeeting,
      Application,
      GroupMembership,
      User,
    ]),
  ],
  controllers: [
    UiController,
    MothersController,
    UsersController,
    GroupsController,
    GroupMeetingsController,
    ApplicationsController,
    GroupMembershipsController,
  ],
  providers: [
    MothersService,
    UsersService,
    GroupsService,
    GroupMeetingsService,
    ApplicationsService,
    GroupMembershipsService,
  ],
})
export class AppModule {}
