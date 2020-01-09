import Pageable from './Pageable';
import PageSpec from './PageSpec';

export class PageableFactory {
  public static sample<T>(
    elements: T[],
    pageSpec: Partial<PageSpec> = {},
  ): Pageable<T> {
    const size = pageSpec.size || 30;
    const totalElements = pageSpec.totalElements || elements.length;

    return {
      pageSpec: {
        number: 0,
        totalPages: Math.ceil(totalElements / size),
        size,
        totalElements,
        ...pageSpec,
      },
      page: [...elements],
    };
  }
}
