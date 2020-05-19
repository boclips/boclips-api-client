import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../model/CollectionRequest';

export interface CollectionsClient {
  getCollections(filter: CollectionFilter): Promise<Pageable<Collection>>;

  getMyCollections(filter: CollectionFilter): Promise<Pageable<Collection>>;

  get(id: string): Promise<Collection | null>;

  create(request: CreateCollectionRequest): Promise<string>;

  update(id: string, request: UpdateCollectionRequest): Promise<{}>;
}
