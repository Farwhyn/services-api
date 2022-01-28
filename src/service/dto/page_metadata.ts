import { PaginationParams } from './pagination_params';

export class PageMetadata {
  readonly total: number;

  readonly first: string | null;

  readonly last: string | null;

  readonly prev: string | null;

  readonly next: string | null;

  constructor(params: PaginationParams) {
    this.total = params.totalCount;
    this.prev = PageMetadata.constructUrl(params, params.pgnum - 1);
    this.next = PageMetadata.constructUrl(params, params.pgnum + 1);
    this.first = PageMetadata.constructUrl(params, 1);
    this.last = PageMetadata.constructUrl(
      params,
      PageMetadata.getLastPage(params.totalCount, params.pgsize),
    );
  }

  static constructUrl(params: PaginationParams, page: number): string | null {
    if (params.totalCount === 0) return null;
    if (page < 1) return null;
    if (page > PageMetadata.getLastPage(params.totalCount, params.pgsize)) {
      return null;
    }

    /*
      Cheating here because i'm running out of time. Will look into how to get the full
      path from requests in the future. 
    */
    let root = `/api/v1/services?pgnum=${page}&pgsize=${params.pgsize}`;
    if (params.find) root += `&find=${params.find}`;
    if (params.sort) root += `&sort=${params.sort}`;
    return root;
  }

  static getLastPage(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }
}
