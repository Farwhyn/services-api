import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { FindOneParams, QueryParams } from './queryparams/queryparams';
import { Service } from './service.entity';

@Controller('api/v1/services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(['', 'search'])
  getServices(@Query() queryParams: QueryParams) {
    console.log(queryParams);
    return this.serviceService.returnSearchResults(queryParams);
  }

  @Get('/:id')
  async show(@Param(ValidationPipe) params: FindOneParams): Promise<Service> {
    return await this.serviceService.getServiceById(params.id);
  }
}
