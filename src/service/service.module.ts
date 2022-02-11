import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICE_SERVICE } from './dto/service.interface';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [
    {
      useClass: ServiceService,
      provide: SERVICE_SERVICE,
    },
  ],
})
export class ServiceModule {}
