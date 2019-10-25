import { Collection } from './types';

export interface CollectionsController {
  getAll(): Promise<Collection[]>;
  get(id: string): Promise<Collection>;
}
