import { Link } from './LinkEntity';
import Pageable from './Pageable';
import { PageableEntity } from './PageableEntity';

export class PageableConverter {
  public static convert<E, T>(
    pageableEntity: PageableEntity<E>,
    key: string,
    embeddedConverter,
  ): Pageable<T> {
    return {
      pageSpec: {
        number: pageableEntity.page.number,
        size: pageableEntity.page.size,
        totalElements: pageableEntity.page.totalElements,
        totalPages: pageableEntity.page.totalPages,
        nextPage:
          pageableEntity._links.next && new Link(pageableEntity._links.next),
        previousPage:
          pageableEntity._links.prev && new Link(pageableEntity._links.prev),
      },
      page: pageableEntity._embedded[key].map(embeddedConverter),
    };
  }
}
