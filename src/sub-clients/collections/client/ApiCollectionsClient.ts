import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageableEntity } from '../../common/model/PageableEntity';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CollectionsConverter } from '../CollectionsConverter';
import { Collection } from '../model/Collection';
import { CollectionEntity } from '../model/CollectionEntity';
import CollectionFilter from '../model/CollectionFilter';
import { CollectionsClient } from './CollectionsClient';

export class ApiCollectionsClient extends ApiSubClient
  implements CollectionsClient {
  public get(id: string): Promise<Collection> {
    const collectionLink = this.getLinkOrThrow('collection');

    return this.axios
      .get<CollectionEntity>(expandUrlTemplate(collectionLink.href, { id }))
      .then(response => CollectionsConverter.convert(response.data));
  }

  public getAllFiltered(
    filter: CollectionFilter,
  ): Promise<Pageable<Collection>> {
    const { query, page, size, projection } = filter;
    const filteredCollectionsLink = this.getLinkOrThrow(
      'adminCollectionSearch',
    );

    return this.axios
      .get<PageableEntity<CollectionEntity>>(
        expandUrlTemplate(filteredCollectionsLink.href, {
          query,
          page,
          size,
          projection,
        }),
      )
      .then(response => CollectionsConverter.convertAll(response.data));
  }
}
