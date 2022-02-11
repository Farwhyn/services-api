import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindOneParams, QueryParams } from './queryparams/queryparams';
import { Service } from './service.entity';
import { Page } from './dto/page';
import { SERVICE_SERVICE, SService } from './dto/service.interface';

@Controller('api/v1/services')
export class ServiceController {
  constructor(@Inject(SERVICE_SERVICE) private serviceService: SService) {}

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
