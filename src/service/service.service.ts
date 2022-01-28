import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './dto/page';
import { PageMetadata } from './dto/page_metadata';
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

  async returnSearchResults(params: QueryParams): Promise<Page<Service>> {
    const alias = 'service';
    const { find, sort, pgnum, pgsize }: QueryParams = { ...params };
    const queryBuilder = this.serviceRepository.createQueryBuilder(alias);

    if (find) {
      queryBuilder.where(
        `${alias}.name ILIKE :find OR ${alias}.description ILIKE :find`,
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
      queryBuilder.orderBy(`${alias}.name`, (sort as any).toUpperCase());
    }
    const data = await queryBuilder.getMany();
    const totalCount = await queryBuilder.getCount();
    const metaData = new PageMetadata({
      totalCount,
      pgnum: pageNumber,
      pgsize: pageSize,
      find,
      sort,
    });
    return new Page<Service>(data, metaData);
  }
}
