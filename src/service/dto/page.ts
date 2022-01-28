import { IsArray } from 'class-validator';
import { PageMetadata } from './page_metadata';

export class Page<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetadata;

  constructor(data: T[], meta: PageMetadata) {
    this.data = data;
    this.meta = meta;
  }
}
