import { CreateHttpFeedRequest, HttpFeed } from '../../types';

export interface FeedsController {
  create(request: CreateHttpFeedRequest): Promise<void>;
  getAll(provider?: string): Promise<HttpFeed[]>;
}
