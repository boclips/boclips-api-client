import { Collection } from '../../collections/model/Collection';
import { Clearable } from '../../common/utils/Clearable';
import { Video } from '../../videos/model/Video';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import {
  EventRequest,
  PlatformInteractedWith,
  VideoInteractedWith,
} from '../model/EventRequest';
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
    this.events.push({ type: 'USER_EXPIRED' });
    return Promise.resolve();
  }

  public trackPlatformInteraction(
    subtype: string,
    anonymous?: boolean,
  ): Promise<void> {
    const event: PlatformInteractedWith = {
      type: 'PLATFORM_INTERACTED_WITH',
      subtype,
      anonymous,
    };

    this.events.push(event);
    return Promise.resolve();
  }

  trackVideoInteraction(
    _video: Pick<Video, 'id' | 'links'>,
    subtype: string,
  ): Promise<void> {
    const event: VideoInteractedWith = {
      type: 'VIDEO_INTERACTED_WITH',
      subtype,
    };
    this.events.push(event);
    return Promise.resolve();
  }

  public clear() {
    this.events = [];
  }

  public getEvents() {
    return this.events;
  }
}
