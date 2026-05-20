import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto, UpdateApplicationDto } from '../dto/application.dto';
import { Application } from '../entities';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationsRepository: Repository<Application>,
  ) {}

  findAll() {
    return this.applicationsRepository.find({
      relations: ['mother', 'group', 'reviewer'],
    });
  }

  async findOne(id: number) {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: ['mother', 'group', 'reviewer'],
    });

    if (!application) {
      throw new NotFoundException(`Application ${id} not found.`);
    }

    return application;
  }

  create(dto: CreateApplicationDto) {
    const application = this.applicationsRepository.create({
      status: 'pending',
      ...dto,
    });
    return this.applicationsRepository.save(application);
  }

  async update(id: number, dto: UpdateApplicationDto) {
    const application = await this.applicationsRepository.preload({
      id,
      ...dto,
    });

    if (!application) {
      throw new NotFoundException(`Application ${id} not found.`);
    }

    return this.applicationsRepository.save(application);
  }

  async remove(id: number) {
    const application = await this.findOne(id);
    await this.applicationsRepository.remove(application);
    return { deleted: true, id };
  }
}
