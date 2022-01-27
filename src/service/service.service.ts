import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async queryBuilder(resource: string) {
    return this.serviceRepository.createQueryBuilder(resource);
  }
}
