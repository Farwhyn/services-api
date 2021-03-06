import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from './service/service.module';
import { Service } from './service/service.entity';

@Module({
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
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
