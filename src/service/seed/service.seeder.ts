import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Service } from '../service.entity';

export class ServiceSeeder implements Seeder {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  seed(): Promise<any> {
    const services = DataFactory.createForClass(Service).generate(50);

    return this.serviceRepository.insert(services);
  }

  drop(): Promise<any> {
    return this.serviceRepository.delete({});
  }
}
