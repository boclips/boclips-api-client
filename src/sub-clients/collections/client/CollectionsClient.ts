import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';
import { CreateCollectionRequest } from '../model/CollectionRequest';

export interface CollectionsClient {
  getAllFiltered(filter: CollectionFilter): Promise<Pageable<Collection>>;

  get(id: string): Promise<Collection>;

  create(request: CreateCollectionRequest): Promise<{}>;
}
