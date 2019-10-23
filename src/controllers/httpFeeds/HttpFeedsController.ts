import { CreateHttpFeedRequest, HttpFeed } from '../../types';
import expandUrlTemplate from '../../utils/expandUrlTemplate';
import { HttpController } from '../HttpController';
import { FeedsController } from './FeedsController';

export class HttpFeedsController extends HttpController
  implements FeedsController {
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
