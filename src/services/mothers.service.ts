import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMotherDto, UpdateMotherDto } from '../dto/mother.dto';
import { Mother } from '../entities';

@Injectable()
export class MothersService {
  constructor(
    @InjectRepository(Mother)
    private readonly mothersRepository: Repository<Mother>,
  ) {}

  findAll() {
    return this.mothersRepository.find({
      relations: ['ledGroups', 'applications', 'reviewedApplications', 'memberships'],
    });
  }

  async findOne(id: number) {
    const mother = await this.mothersRepository.findOne({
      where: { id },
      relations: ['ledGroups', 'applications', 'reviewedApplications', 'memberships'],
    });

    if (!mother) {
      throw new NotFoundException(`Mother ${id} not found.`);
    }

    return mother;
  }

  create(dto: CreateMotherDto) {
    const mother = this.mothersRepository.create(dto);
    return this.mothersRepository.save(mother);
  }

  async update(id: number, dto: UpdateMotherDto) {
    const mother = await this.mothersRepository.preload({
      id,
      ...dto,
    });

    if (!mother) {
      throw new NotFoundException(`Mother ${id} not found.`);
    }

    return this.mothersRepository.save(mother);
  }

  async remove(id: number) {
    const mother = await this.findOne(id);
    await this.mothersRepository.remove(mother);
    return { deleted: true, id };
  }
}
