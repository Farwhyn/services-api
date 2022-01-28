import { Factory } from 'nestjs-seeder';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface Version {
  version: number;
  url: string;
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Factory((faker) => faker.lorem.words(2))
  @Column()
  name: string;

  @Factory((faker) => faker.lorem.words(10))
  @Column()
  description: string;

  @Factory(() => [{ version: 1, url: 'https://www.google.com' }])
  @Column('jsonb')
  versions: Version[];

  @Factory((faker) => faker.date.recent())
  @CreateDateColumn()
  createdAt: Date;

  @Factory((faker) => faker.date.recent())
  @UpdateDateColumn()
  updatedAt: Date;
}
