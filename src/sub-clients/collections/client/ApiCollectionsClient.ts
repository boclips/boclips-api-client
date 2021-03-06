import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageableEntity } from '../../common/model/PageableEntity';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CollectionsConverter } from '../CollectionsConverter';
import { Collection } from '../model/Collection';
import { CollectionEntity } from '../model/CollectionEntity';
import CollectionFilter from '../model/CollectionFilter';
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../model/CollectionRequest';
import { CollectionsClient } from './CollectionsClient';

export class ApiCollectionsClient
  extends ApiSubClient
  implements CollectionsClient {
  public get(id: string): Promise<Collection> {
    const collectionLink = this.getLinkOrThrow('collection');

    return this.axios
      .get<CollectionEntity>(expandUrlTemplate(collectionLink.href, { id }))
      .then((response) => CollectionsConverter.convert(response.data));
  }
  public getCollections(
    filter: CollectionFilter,
  ): Promise<Pageable<Collection>> {
    let filteredCollectionsLink;
    try {
      filteredCollectionsLink = this.getLinkOrThrow('searchAllCollections');
    } catch (ex) {
      filteredCollectionsLink = this.getLinkOrThrow('searchCollections');
    }

    return this.axios
      .get<PageableEntity<CollectionEntity>>(
        expandUrlTemplate(filteredCollectionsLink.href, { ...filter }),
      )
      .then((response) => CollectionsConverter.convertPage(response.data));
  }

  public getMyCollections(
    filter: CollectionFilter,
  ): Promise<Pageable<Collection>> {
    const { query, page, size, projection } = filter;
    const myCollectionsLink = this.getLinkOrThrow('myCollections');

    return this.axios
      .get<PageableEntity<CollectionEntity>>(
        expandUrlTemplate(myCollectionsLink.href, {
          query: query!,
          page,
          size,
          projection,
        }),
      )
      .then((response) => CollectionsConverter.convertPage(response.data));
  }

  public create(request: CreateCollectionRequest): Promise<string> {
    const createCollectionLink = this.getLinkOrThrow('createCollection');
    return this.axios
      .post(createCollectionLink.href, request)
      .then((response) => ApiCollectionsClient.extractIdFromLocation(response));
  }

  public update(id: string, request: UpdateCollectionRequest): Promise<{}> {
    const updateCollectionLink = this.getLinkOrThrow('collection');

    return this.axios.patch(
      expandUrlTemplate(updateCollectionLink.href, { id }),
      request,
    );
  }

  private static extractIdFromLocation(response: AxiosResponse) {
    const link = response.headers.location;
    return link.substr(link.lastIndexOf('/') + 1);
  }
}
