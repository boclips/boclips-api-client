export interface HttpFeed {
  name: string;
  url: string;
  provider: string;
}

export interface CreateHttpFeedRequest extends HttpFeed {
  format?: string;
}
