import { Collection } from '../../collections/model/Collection';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';

export interface EventsClient {
  trackPageRendered(request: PageRenderedRequest): Promise<void>;
  trackCollectionInteraction(
    collection: Collection,
    request: CollectionInteractedWithRequest,
  ): Promise<void>;
  trackUserExpired(): Promise<void>;
}
