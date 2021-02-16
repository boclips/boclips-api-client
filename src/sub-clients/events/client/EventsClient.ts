import { Collection } from '../../collections/model/Collection';
import { Video } from '../../videos/model/Video';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { SearchQueryCompletionsSuggestedRequest } from '../model/SearchQueryCompletionsSuggestedRequest';

export interface EventsClient {
  trackPageRendered(request: PageRenderedRequest): Promise<void>;
  trackCollectionInteraction(
    collection: Pick<Collection, 'id' | 'links'>,
    request: CollectionInteractedWithRequest,
    referer: string | null,
  ): Promise<void>;
  trackUserExpired(): Promise<void>;
  trackPlatformInteraction(subtype: string, anonymous?: boolean): Promise<void>;
  trackVideoInteraction(
    video: Pick<Video, 'id' | 'links'>,
    subtype: string,
  ): Promise<void>;
  trackSearchQueryCompletionsSuggested(
    request: SearchQueryCompletionsSuggestedRequest,
  ): Promise<void>;
}
