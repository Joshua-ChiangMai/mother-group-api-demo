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
import { CreateGroupMembershipDto, UpdateGroupMembershipDto } from '../dto/group-membership.dto';
import { GroupMembershipsService } from '../services/group-memberships.service';

@ApiTags('group-memberships')
@Controller('group-memberships')
export class GroupMembershipsController {
  constructor(private readonly membershipsService: GroupMembershipsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all group memberships',
    description:
      'Returns all group membership records with their linked mother and group. This shows accepted participants who became members.',
  })
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one group membership by id',
    description: 'Retrieve one membership record by id.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group membership id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membershipsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a group membership',
    description:
      'Creates a membership for a mother in a group. In the business flow, this is normally used after the application is accepted.',
  })
  create(@Body() dto: CreateGroupMembershipDto) {
    return this.membershipsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a group membership',
    description: 'Update membership status such as active or inactive.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group membership id.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupMembershipDto) {
    return this.membershipsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a group membership',
    description: 'Delete one membership record.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Group membership id.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membershipsService.remove(id);
  }
}
