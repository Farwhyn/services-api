import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from './queryparams/queryparams';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async getServiceById(resourceId: number): Promise<Service> {
    const service = await this.serviceRepository.findOne(resourceId);
    if (!service) {
      throw new NotFoundException();
    }
    return service;
  }

  async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async returnSearchResults(params: QueryParams) {
    const { find, sort, pgnum, pgsize }: QueryParams = { ...params };
    const queryBuilder = this.serviceRepository.createQueryBuilder('service');

    if (find) {
      queryBuilder.where(
        'service.name ILIKE :find OR service.description ILIKE :find',
        {
          find: `%${params.find}%`,
        },
      );
    }

    const pageNumber: number = pgnum ?? 1;
    const pageSize: number = pgsize ?? 10;
    const offset = (pageNumber - 1) * pageSize;

    queryBuilder.offset(offset).limit(pageSize);

    if (sort) {
      queryBuilder.orderBy('service.name', (sort as any).toUpperCase());
    }
    const data = await queryBuilder.getMany();
    const total = await queryBuilder.getCount();
    return {
      data,
      total,
      last_page: Math.ceil(total / pageSize),
    };
  }
}
