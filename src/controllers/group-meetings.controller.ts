import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateGroupMeetingDto, UpdateGroupMeetingDto } from '../dto/group-meeting.dto';
import { GroupMeetingsService } from '../services/group-meetings.service';

@ApiTags('group-meetings')
@Controller('group-meetings')
export class GroupMeetingsController {
  constructor(private readonly meetingsService: GroupMeetingsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all group meetings',
    description: 'Returns all meeting records and the group each meeting belongs to.',
  })
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one group meeting by id',
    description: 'Retrieve a single meeting definition by id.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group meeting id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meetingsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a group meeting',
    description:
      'Creates a meeting slot for a group. groupId must be an existing group id created earlier in the test flow.',
  })
  create(@Body() dto: CreateGroupMeetingDto) {
    return this.meetingsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a group meeting',
    description: 'Update meeting time, day, or location information.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group meeting id.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupMeetingDto) {
    return this.meetingsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a group meeting',
    description: 'Delete one meeting record.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group meeting id.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.meetingsService.remove(id);
  }
}
