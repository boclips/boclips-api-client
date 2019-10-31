import PageSpec from './PageSpec';

export default interface Pageable<T> {
  page: T[];
  pageSpec: PageSpec;
}
