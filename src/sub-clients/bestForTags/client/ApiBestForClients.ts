import { BestForTagsClient } from './BestForTagsClient';
import { ApiSubClient } from '../../common/client/ApiSubClient';

export class ApiBestForTagsClient extends ApiSubClient
  implements BestForTagsClient {
  public getAll() {
    const bestForTagsLink = this.getLinkOrThrow('tags');

    return this.axios
      .get(bestForTagsLink.href)
      .then(response => response.data._embedded.tags);
  }
}
