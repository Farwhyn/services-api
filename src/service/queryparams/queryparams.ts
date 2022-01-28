import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class QueryParams {
  @IsOptional()
  @IsNotEmpty()
  find: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  pgnum: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  pgsize: number;
}
