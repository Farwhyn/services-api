import { Test, TestingModule } from '@nestjs/testing';
import { Page } from './dto/page';
import { SERVICE_SERVICE, SService } from './dto/service.interface';
import { QueryParams } from './queryparams/queryparams';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';

describe('ServiceController', () => {
  let controller: ServiceController;

  class MockServiceService implements SService {
    getServiceById(resourceId: number): Promise<Service> {
      throw new Error('Method not implemented.');
    }
    returnSearchResults(params: QueryParams): Promise<Page<Service>> {
      throw new Error('Method not implemented.');
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [
        {
          useClass: MockServiceService,
          provide: SERVICE_SERVICE,
        },
      ],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get One Service', () => {
    it('throws error for invalid id param', () => {
      expect(controller.getOneService({ id: 1 })).toBeDefined();
    });
  });
});
