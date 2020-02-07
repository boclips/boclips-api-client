import { BestForTag } from '../model/BestForTag';

export interface BestForTagsClient {
  getAll(): Promise<BestForTag[]>;
}
