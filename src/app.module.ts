import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from './service/service.module';
import config from 'config';
import { Service } from './service/service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.get('db_type'),
      host: config.get('db_host'),
      port: config.get('db_port'),
      username: config.get('db_username'),
      password: config.get('db_password'),
      database: config.get('db_name'),
      entities: [Service],
      synchronize: true,
    }),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
