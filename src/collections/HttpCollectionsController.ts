import { HttpController } from '../controllers/HttpController';
import { Collection, CollectionEntity } from '../types';
import expandUrlTemplate from '../utils/expandUrlTemplate';
import { CollectionsController } from './CollectionsController';
import { CollectionsConverter } from './CollectionsConverter';

export class HttpCollectionsController extends HttpController
  implements CollectionsController {
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
