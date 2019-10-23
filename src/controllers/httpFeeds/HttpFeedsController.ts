import { AxiosInstance } from 'axios';
import { BackofficeLinks } from '../../types';
import { CreateHttpFeedRequest, HttpFeed } from '../../types';
import expandUrlTemplate from '../../utils/expandUrlTemplate';
import { FeedsController } from './FeedsController';

export class HttpFeedsController implements FeedsController {
  public constructor(
    private backofficeLinks: BackofficeLinks,
    private axios: AxiosInstance,
  ) {}

  public async create(request: CreateHttpFeedRequest): Promise<void> {
    if (this.backofficeLinks && this.backofficeLinks.createHttpFeed) {
      return this.axios.post(this.backofficeLinks.createHttpFeed.href, request);
    } else {
      throw new Error('Not authorized for method');
    }
  }

  public async getAll(provider?: string): Promise<HttpFeed[]> {
    if (this.backofficeLinks && this.backofficeLinks.httpFeeds) {
      const response = await this.axios.get(
        expandUrlTemplate(this.backofficeLinks.httpFeeds.href, { provider }),
      );
      return response.data._embedded.httpFeeds;
    } else {
      throw new Error('Not authorized for method');
    }
  }
}
