import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from '../dto/group.dto';
import { Group } from '../entities';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  findAll() {
    return this.groupsRepository.find({
      relations: ['leader', 'meetings', 'applications', 'memberships'],
    });
  }

  async findOne(id: number) {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['leader', 'meetings', 'applications', 'memberships'],
    });

    if (!group) {
      throw new NotFoundException(`Group ${id} not found.`);
    }

    return group;
  }

  create(dto: CreateGroupDto) {
    const group = this.groupsRepository.create({
      capacity: 12,
      ...dto,
    });
    return this.groupsRepository.save(group);
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.groupsRepository.preload({
      id,
      ...dto,
    });

    if (!group) {
      throw new NotFoundException(`Group ${id} not found.`);
    }

    return this.groupsRepository.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    await this.groupsRepository.remove(group);
    return { deleted: true, id };
  }
}
