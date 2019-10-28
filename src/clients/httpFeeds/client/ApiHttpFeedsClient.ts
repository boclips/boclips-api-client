import { ApiClient } from '../../common/client/ApiClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CreateHttpFeedRequest, HttpFeed } from '../model/HttpFeed';
import { HttpFeedsClient } from './HttpFeedsClient';

export class ApiHttpFeedsClient extends ApiClient implements HttpFeedsClient {
  public async create(request: CreateHttpFeedRequest): Promise<void> {
    return this.requestWithAdminLink('createHttpFeed', async () => {
      return this.axios.post(this.adminLinks.createHttpFeed.href, request);
    });
  }

  public async getAll(provider?: string): Promise<HttpFeed[]> {
    return this.requestWithAdminLink('httpFeeds', async () => {
      const response = await this.axios.get(
        expandUrlTemplate(this.adminLinks.httpFeeds.href, { provider }),
      );
      return response.data._embedded.httpFeeds;
    });
  }
}
