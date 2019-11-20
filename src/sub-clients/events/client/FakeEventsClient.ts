import { Clearable } from '../../common/utils/Clearable';
import { EventRequest } from '../model/EventRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { EventsClient } from './EventsClient';

export class FakeEventsClient implements EventsClient, Clearable {
  private events: EventRequest[] = [];

  public trackPageRendered(request: PageRenderedRequest): Promise<void> {
    this.events.push(request);
    return Promise.resolve();
  }

  public clear() {
    this.events = [];
  }

  public getEvents() {
    return this.events;
  }
}
