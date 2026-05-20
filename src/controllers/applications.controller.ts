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
import { CreateApplicationDto, UpdateApplicationDto } from '../dto/application.dto';
import { ApplicationsService } from '../services/applications.service';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all applications',
    description:
      'Returns all application records with applicant mother, target group, and optional reviewer mother.',
  })
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one application by id',
    description: 'Retrieve one application record by id.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Application id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create an application',
    description:
      'Creates an application for an applicant mother to join a group. motherId should be the applicant mother, groupId should be the target group, and reviewerMotherId can be the leader mother.',
  })
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an application',
    description:
      'Use this to move an application through prototype states such as pending, interview_scheduled, accepted, or rejected.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Application id.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplicationDto) {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an application',
    description: 'Delete one application record.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Application id.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.remove(id);
  }
}
