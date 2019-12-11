import { LinkEntity } from './LinkEntity';
import Pageable from './Pageable';
import PageSpec from './PageSpec';

export interface PageableEntity<T> {
  page: PageSpecEntity;
  _embedded: { [key: string]: T[] };
  _links: { [key: string]: LinkEntity };
}

export interface PageSpecEntity {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export class PageableFactory {
  public static sample<T>(
    elements: T[],
    pageSpec: Partial<PageSpec> = {},
  ): Pageable<T> {
    return {
      pageSpec: {
        number: 0,
        size: 30,
        totalPages: 1,
        totalElements: elements.length,
        ...pageSpec,
      },
      page: [...elements],
    };
  }
}
