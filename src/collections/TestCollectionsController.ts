import { HttpController } from '../controllers/HttpController';
import { Collection } from '../types';
import { CollectionsController } from './CollectionsController';

export class TestCollectionsController extends HttpController
  implements CollectionsController {
  private collections: Collection[] = [];

  public add(collection: Collection) {
    this.collections.push(collection);
  }

  public get(id: string): Promise<Collection> {
    return Promise.resolve(this.collections.find(c => c.id === id));
  }

  public getAll(): Promise<Collection[]> {
    return undefined;
  }
}
