import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupMeetingDto, UpdateGroupMeetingDto } from '../dto/group-meeting.dto';
import { GroupMeeting } from '../entities';

@Injectable()
export class GroupMeetingsService {
  constructor(
    @InjectRepository(GroupMeeting)
    private readonly meetingsRepository: Repository<GroupMeeting>,
  ) {}

  findAll() {
    return this.meetingsRepository.find({
      relations: ['group'],
    });
  }

  async findOne(id: number) {
    const meeting = await this.meetingsRepository.findOne({
      where: { id },
      relations: ['group'],
    });

    if (!meeting) {
      throw new NotFoundException(`Group meeting ${id} not found.`);
    }

    return meeting;
  }

  create(dto: CreateGroupMeetingDto) {
    const meeting = this.meetingsRepository.create(dto);
    return this.meetingsRepository.save(meeting);
  }

  async update(id: number, dto: UpdateGroupMeetingDto) {
    const meeting = await this.meetingsRepository.preload({
      id,
      ...dto,
    });

    if (!meeting) {
      throw new NotFoundException(`Group meeting ${id} not found.`);
    }

    return this.meetingsRepository.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.findOne(id);
    await this.meetingsRepository.remove(meeting);
    return { deleted: true, id };
  }
}
