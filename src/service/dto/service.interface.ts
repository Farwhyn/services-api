import { QueryParams } from '../queryparams/queryparams';
import { Service } from '../service.entity';
import { Page } from './page';

export const SERVICE_SERVICE = 'SERVICE SERVICE';

export interface SService {
  getServiceById(resourceId: number): Promise<Service>;

  returnSearchResults(params: QueryParams): Promise<Page<Service>>;
}
