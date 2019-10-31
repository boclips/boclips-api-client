import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CreateHttpFeedRequest, HttpFeed } from '../model/HttpFeed';
import { HttpFeedsClient } from './HttpFeedsClient';

export class ApiHttpFeedsClient extends ApiSubClient
  implements HttpFeedsClient {
  public async create(request: CreateHttpFeedRequest): Promise<void> {
    const createLink = this.getLinkOrThrow('createHttpFeed');

    return this.axios.post(createLink.href, request);
  }

  public async getAll(provider?: string): Promise<HttpFeed[]> {
    const httpFeedsLink = this.getLinkOrThrow('httpFeeds');

    return this.axios
      .get(expandUrlTemplate(httpFeedsLink.href, { provider }))
      .then(response => response.data._embedded.httpFeeds);
  }
}
