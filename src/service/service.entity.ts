import { Factory } from 'nestjs-seeder';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
