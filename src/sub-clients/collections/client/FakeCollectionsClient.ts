import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';
import { CollectionsClient } from './CollectionsClient';

export class FakeCollectionsClient implements CollectionsClient {
  private collections: Collection[] = [];

  public addToFake(collection: Collection) {
    this.collections.push(collection);
  }

  public get(id: string): Promise<Collection> {
    return Promise.resolve(this.collections.find(c => c.id === id));
  }

  public getAllFiltered(
    filter: CollectionFilter,
  ): Promise<Pageable<Collection>> {
    const fromIndex = filter.page * filter.size;
    const untilIndex = (filter.page + 1) * filter.size;
    return Promise.resolve({
      pageSpec: {
        number: filter.page,
        size: filter.size,
        totalElements: this.collections.length,
        totalPages: Math.floor(this.collections.length / filter.size),
      },
      page: this.collections.slice(fromIndex, untilIndex),
    });
  }
}
