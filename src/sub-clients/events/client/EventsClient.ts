import { PageRenderedRequest } from '../model/PageRenderedRequest';

export interface EventsClient {
  trackPageRendered(request: PageRenderedRequest): Promise<void>;
}
