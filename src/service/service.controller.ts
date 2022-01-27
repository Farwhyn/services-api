import { Controller, Get, Req } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Request } from 'express';

@Controller('api/v1/services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get()
  async index() {
    return await this.serviceService.findAll();
  }

  @Get('search')
  async search(@Req() req: Request) {
    const builder = await this.serviceService.queryBuilder('service');
    if (req.query.find) {
      builder.where(
        'service.name ILIKE :find OR service.description ILIKE :find',
        {
          find: `%${req.query.find}%`,
        },
      );
    }

    const sort: any = req.query.sort;
    if (sort) {
      builder.orderBy('service.name', sort.toUpperCase());
    }

    const pageNumber: any = req.query.pNum ?? '1';
    const pageSize: any = req.query.pSize ?? '10';
    const offset = (parseInt(pageNumber) - 1) * parseInt(pageSize);

    builder.offset(offset).limit(pageSize);
    const data = await builder.getMany();
    const total = await builder.getCount();
    return {
      data,
      total,
      last_page: Math.ceil(total / pageSize),
    };
  }
}
