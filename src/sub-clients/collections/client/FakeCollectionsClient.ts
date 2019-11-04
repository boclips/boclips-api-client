import { CollectionFactory } from '../../../test-support';
import { VideoFactory } from '../../../test-support/VideosFactory';
import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';
import { CreateCollectionRequest } from '../model/CollectionRequest';
import { CollectionsClient } from './CollectionsClient';

export class FakeCollectionsClient implements CollectionsClient {
  private collections: Collection[] = [];
  private nextId: string = '123';

  // todo: group these fake-related methods in some way
  public addToFake(collection: Collection) {
    this.collections.push(collection);
  }

  public setNextIdForFake(id: string) {
    this.nextId = id;
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

  public create(request: CreateCollectionRequest): Promise<string> {
    const { title, description, public: isPublic, videos } = request;
    const collection = CollectionFactory.sample({
      id: this.nextId,
      title,
      description,
      videos: videos.map(id => VideoFactory.sample({ id })),
      public: isPublic,
    });
    this.addToFake(collection);

    return Promise.resolve(collection.id);
  }
}
