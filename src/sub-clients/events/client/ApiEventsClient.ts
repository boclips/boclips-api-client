import { AxiosRequestConfig } from 'axios';
import { Collection } from '../../collections/model/Collection';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { Video } from '../../videos/model/Video';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { SearchQueryCompletionsSuggestedRequest } from '../model/SearchQueryCompletionsSuggestedRequest';
import { EventsClient } from './EventsClient';
import { Link } from '../../common/model/LinkEntity';

export class ApiEventsClient extends ApiSubClient implements EventsClient {
  public trackSearchQueryCompletionsSuggested(
    request: SearchQueryCompletionsSuggestedRequest,
  ): Promise<void> {
    const trackSearchQueryCompletionsSuggestedLink = this.getLinkOrThrow(
      'createSearchQueryCompletionsSuggestedEvent',
    );

    return this.axios.post(
      trackSearchQueryCompletionsSuggestedLink.href,
      request,
      this.getHeaderWithReferer(),
    );
  }

  public trackPageRendered(request: PageRenderedRequest): Promise<void> {
    const trackPageRenderedLink = this.getLinkOrThrow('trackPageRendered');

    return this.axios.post(trackPageRenderedLink.href, request);
  }

  public trackCollectionInteraction(
    collection: Pick<Collection, 'id' | 'links'>,
    request: CollectionInteractedWithRequest,
    referer: string | null = null,
  ): Promise<void> {
    const validInteractionLink = collection && collection.links.interactedWith;
    if (!validInteractionLink) {
      throw new Error('Collection interaction link not available');
    }
    return this.axios.post(validInteractionLink.getOriginalLink(), request, {
      headers: { 'Boclips-Referer': referer },
    });
  }

  public trackUserExpired(): Promise<void> {
    const trackPageRenderedLink = this.getLink('reportAccessExpired');

    if (!trackPageRenderedLink) {
      return Promise.resolve();
    }

    return this.axios.post(trackPageRenderedLink.href);
  }

  public trackPlatformInteraction(
    subtype: string,
    anonymous?: boolean,
  ): Promise<void> {
    const trackLinkEntity = this.getLinkOrThrow('trackPlatformInteractedWith');

    const expandedLink = new Link({
      href: trackLinkEntity.href,
      templated: trackLinkEntity.templated,
    }).getTemplatedLink({ subtype, anonymous });

    return this.axios.post(expandedLink, {}, this.getHeaderWithReferer());
  }

  public trackVideoInteraction(
    video: Pick<Video, 'id' | 'links'>,
    subtype: string,
  ): Promise<void> {
    return this.axios.post(
      video.links.logInteraction.getTemplatedLink({ type: subtype }),
      {},
      this.getHeaderWithReferer(),
    );
  }

  private getHeaderWithReferer(): AxiosRequestConfig {
    return {
      headers: { 'Boclips-Referer': window.location.href },
    };
  }
}
