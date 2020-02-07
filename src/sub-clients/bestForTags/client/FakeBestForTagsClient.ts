import { Clearable } from '../../common/utils/Clearable';
import { BestForTag } from '../model/BestForTag';
import { BestForTagsClient } from './BestForTagsClient';

export class FakeBestForTagsClient implements BestForTagsClient, Clearable {
  private bestForTags: BestForTag[] = [];

  public insertBestForTag(bestForTags: BestForTag) {
    this.bestForTags.push(bestForTags);
  }
  public getAll(): Promise<BestForTag[]> {
    return Promise.resolve(this.bestForTags);
  }
  public clear() {
    this.bestForTags = [];
  }
}
