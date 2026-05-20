import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupMembershipDto, UpdateGroupMembershipDto } from '../dto/group-membership.dto';
import { GroupMembership } from '../entities';

@Injectable()
export class GroupMembershipsService {
  constructor(
    @InjectRepository(GroupMembership)
    private readonly membershipsRepository: Repository<GroupMembership>,
  ) {}

  findAll() {
    return this.membershipsRepository.find({
      relations: ['mother', 'group'],
    });
  }

  async findOne(id: number) {
    const membership = await this.membershipsRepository.findOne({
      where: { id },
      relations: ['mother', 'group'],
    });

    if (!membership) {
      throw new NotFoundException(`Group membership ${id} not found.`);
    }

    return membership;
  }

  create(dto: CreateGroupMembershipDto) {
    const membership = this.membershipsRepository.create({
      status: 'active',
      ...dto,
    });
    return this.membershipsRepository.save(membership);
  }

  async update(id: number, dto: UpdateGroupMembershipDto) {
    const membership = await this.membershipsRepository.preload({
      id,
      ...dto,
    });

    if (!membership) {
      throw new NotFoundException(`Group membership ${id} not found.`);
    }

    return this.membershipsRepository.save(membership);
  }

  async remove(id: number) {
    const membership = await this.findOne(id);
    await this.membershipsRepository.remove(membership);
    return { deleted: true, id };
  }
}
