import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';

export interface CollectionsClient {
  getAllFiltered(filter: CollectionFilter): Promise<Pageable<Collection>>;
  get(id: string): Promise<Collection>;
}
