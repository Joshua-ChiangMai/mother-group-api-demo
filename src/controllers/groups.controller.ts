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
import { CreateGroupDto, UpdateGroupDto } from '../dto/group.dto';
import { GroupsService } from '../services/groups.service';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all groups',
    description:
      'Returns all groups with their related leader, meetings, applications, and memberships. This is a good endpoint to demonstrate the overall relational structure.',
  })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one group by id',
    description: 'Retrieve a single group and its relationships by id.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a group',
    description:
      'Creates a bible study group. leaderMotherId must be an existing mother id, typically the leader mother created earlier in the test flow.',
  })
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a group',
    description: 'Update group details such as capacity, description, or location.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group id.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
    return this.groupsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a group',
    description:
      'Delete one group. Use this near the end of testing because meetings, applications, and memberships depend on the group.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group id.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }
}
