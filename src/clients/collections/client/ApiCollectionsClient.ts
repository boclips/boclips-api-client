import { ApiClient } from '../../common/client/ApiClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CollectionsConverter } from '../CollectionsConverter';
import { Collection } from '../model/Collection';
import { CollectionEntity } from '../model/CollectionEntity';
import { CollectionsClient } from './CollectionsClient';

export class ApiCollectionsClient extends ApiClient
  implements CollectionsClient {
  public get(id: string): Promise<Collection> {
    return this.requestWithAdminLink('collection', async () => {
      const response = await this.axios.get<CollectionEntity>(
        expandUrlTemplate(this.adminLinks.collection.href, { id }),
      );
      return CollectionsConverter.convert(response.data);
    });
  }

  public getAll(): Promise<Collection[]> {
    return undefined;
  }
}
