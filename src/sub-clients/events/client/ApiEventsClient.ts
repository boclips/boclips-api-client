import { ApiSubClient } from '../../common/client/ApiSubClient';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { EventsClient } from './EventsClient';

export class ApiEventsClient extends ApiSubClient implements EventsClient {
  public trackPageRendered(request: PageRenderedRequest): Promise<void> {
    const trackPageRenderedLink = this.getLinkOrThrow('trackPageRendered');

    return this.axios.post(trackPageRenderedLink.href, request);
  }
}
