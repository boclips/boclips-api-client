import { LinkEntity } from './LinkEntity';

export interface PageableEntity<T> {
  page: PageSpecEntity;
  _embedded: { [key: string]: T[] };
  _links?: { [key: string]: LinkEntity };
}

export interface PageSpecEntity {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
