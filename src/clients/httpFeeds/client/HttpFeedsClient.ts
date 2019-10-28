import { CreateHttpFeedRequest, HttpFeed } from '../model/HttpFeed';

export interface HttpFeedsClient {
  create(request: CreateHttpFeedRequest): Promise<void>;
  getAll(provider?: string): Promise<HttpFeed[]>;
}
