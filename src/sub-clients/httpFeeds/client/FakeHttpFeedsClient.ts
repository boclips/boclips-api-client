import { Clearable } from '../../common/utils/Clearable';
import { CreateHttpFeedRequest, HttpFeed } from '../model/HttpFeed';
import { HttpFeedsClient } from './HttpFeedsClient';

export class FakeHttpFeedsClient implements HttpFeedsClient, Clearable {
  private feeds: HttpFeed[] = [];

  public insert(feed: HttpFeed) {
    this.feeds.push(feed);
  }

  public async create(request: CreateHttpFeedRequest) {
    const { name, url, provider } = request;
    this.feeds.push({ name, url, provider });
  }

  public async getAll(provider?: string): Promise<HttpFeed[]> {
    const feeds = provider
      ? this.feeds.filter(e => e.provider === provider)
      : this.feeds;
    return Promise.resolve(feeds);
  }

  public clear() {
    this.feeds = [];
  }
}
