import { ApiClient } from '../../common/client/ApiClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CollectionsConverter } from '../CollectionsConverter';
import { Collection } from '../model/Collection';
import { CollectionEntity } from '../model/CollectionEntity';
import { CollectionsClient } from './CollectionsClient';

export class ApiCollectionsClient extends ApiClient
  implements CollectionsClient {
  public get(id: string): Promise<Collection> {
    const collectionLink = this.getLinkOrThrow('collection');

    return this.axios
      .get<CollectionEntity>(expandUrlTemplate(collectionLink.href, { id }))
      .then(response => CollectionsConverter.convert(response.data));
  }

  public getAll(): Promise<Collection[]> {
    return undefined;
  }
}
