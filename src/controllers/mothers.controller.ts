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
import { CreateMotherDto, UpdateMotherDto } from '../dto/mother.dto';
import { MothersService } from '../services/mothers.service';

@ApiTags('mothers')
@Controller('mothers')
export class MothersController {
  constructor(private readonly mothersService: MothersService) {}

  @Get()
  @ApiOperation({
    summary: 'List all mothers',
    description:
      'Returns all mother records. In this prototype, a mother can be either a group leader or an applicant depending on how the record is later used.',
  })
  findAll() {
    return this.mothersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one mother by id',
    description: 'Use this after creating a mother to inspect one specific leader or applicant record.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Mother id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mothersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a mother record',
    description:
      'This is the same endpoint for both "leader mother" and "applicant mother". The difference is only how the created id is used later: leader mothers are referenced by groups.leaderMotherId, while applicant mothers are referenced by applications.motherId and group_memberships.motherId.',
  })
  create(@Body() dto: CreateMotherDto) {
    return this.mothersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a mother record',
    description: 'Update profile details for an existing mother record.',
  })
  @ApiParam({ name: 'id', example: 2, description: 'Mother id.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMotherDto) {
    return this.mothersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a mother record',
    description:
      'Delete one mother. Run this near the end of testing because mothers are referenced by groups, applications, and memberships.',
  })
  @ApiParam({ name: 'id', example: 2, description: 'Mother id.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mothersService.remove(id);
  }
}
