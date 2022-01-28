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
import { Page } from './dto/page';

@Controller('api/v1/services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getServices(@Query() queryParams: QueryParams): Promise<Page<Service>> {
    return this.serviceService.returnSearchResults(queryParams);
  }

  @Get('/:id')
  async getOneService(
    @Param(ValidationPipe) params: FindOneParams,
  ): Promise<Service> {
    return await this.serviceService.getServiceById(params.id);
  }
}
