import { Collection } from '../../collections/model/Collection';
import { Clearable } from '../../common/utils/Clearable';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { EventRequest } from '../model/EventRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { SearchQueryCompletionsSuggestedRequest } from '../model/SearchQueryCompletionsSuggestedRequest';
import { EventsClient } from './EventsClient';

export class FakeEventsClient implements EventsClient, Clearable {
  private events: EventRequest[] = [];

  public trackPageRendered(request: PageRenderedRequest): Promise<void> {
    this.events.push(request);
    return Promise.resolve();
  }

  public trackSearchQueryCompletionsSuggested(
    request: SearchQueryCompletionsSuggestedRequest,
  ): Promise<void> {
    this.events.push(request);
    return Promise.resolve();
  }

  public trackCollectionInteraction(
    _: Pick<Collection, 'id' | 'links'>,
    request: CollectionInteractedWithRequest,
    _referer: string | null,
  ): Promise<void> {
    this.events.push(request);
    return Promise.resolve();
  }

  public trackUserExpired(): Promise<void> {
    this.events.push('USER_EXPIRED');
    return Promise.resolve();
  }

  public trackPlatformInteraction(
    subtype: string,
    anonymous?: boolean,
  ): Promise<void> {
    this.events.push({ type: 'PLATFORM_INTERACTED_WITH', subtype, anonymous });
    return Promise.resolve();
  }

  public clear() {
    this.events = [];
  }

  public getEvents() {
    return this.events;
  }
}
