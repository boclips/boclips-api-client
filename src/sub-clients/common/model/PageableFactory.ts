import Pageable from './Pageable';
import PageSpec from './PageSpec';

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
