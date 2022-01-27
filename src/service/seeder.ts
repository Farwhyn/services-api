import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Service } from './service.entity';
import { ServiceSeeder } from './service.seeder';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test123',
      database: 'services_db',
      entities: [Service],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Service]),
  ],
}).run([ServiceSeeder]);
