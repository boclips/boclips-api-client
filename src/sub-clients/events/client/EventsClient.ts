import { Collection } from '../../collections/model/Collection';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';

export interface EventsClient {
  trackPageRendered(request: PageRenderedRequest): Promise<void>;
  trackCollectionInteraction(
    collection: Pick<Collection, 'id' | 'links'>,
    request: CollectionInteractedWithRequest,
    referer: string | null,
  ): Promise<void>;
  trackUserExpired(): Promise<void>;
  trackPlatformInteraction(subtype: string): Promise<void>;
}
