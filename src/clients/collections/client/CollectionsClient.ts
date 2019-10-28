import { Collection } from '../model/Collection';

export interface CollectionsClient {
  getAll(): Promise<Collection[]>;
  get(id: string): Promise<Collection>;
}
