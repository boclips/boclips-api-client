import { ApiClient } from '../../common/client/ApiClient';
import { Collection } from '../model/Collection';
import { CollectionsClient } from './CollectionsClient';

export class FakeCollectionsClient extends ApiClient
  implements CollectionsClient {
  private collections: Collection[] = [];

  public add(collection: Collection) {
    this.collections.push(collection);
  }

  public get(id: string): Promise<Collection> {
    return Promise.resolve(this.collections.find(c => c.id === id));
  }

  public getAll(): Promise<Collection[]> {
    return undefined;
  }
}
