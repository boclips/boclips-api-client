import { Collection } from '../../collections/model/Collection';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { EventsClient } from './EventsClient';
import { Link } from '../../common/model/LinkEntity';

export class ApiEventsClient extends ApiSubClient implements EventsClient {
  public trackPageRendered(request: PageRenderedRequest): Promise<void> {
    const trackPageRenderedLink = this.getLinkOrThrow('trackPageRendered');

    return this.axios.post(trackPageRenderedLink.href, request);
  }

  public trackCollectionInteraction(
    collection: Pick<Collection, 'id' | 'links'>,
    request: CollectionInteractedWithRequest,
  ): Promise<void> {
    const validInteractionLink = collection && collection.links.interactedWith;
    if (!validInteractionLink) {
      throw new Error('Collection interaction link not available');
    }
    return this.axios.post(validInteractionLink.getOriginalLink(), request);
  }

  public trackUserExpired(): Promise<void> {
    const trackPageRenderedLink = this.getLink('reportAccessExpired');

    if (!trackPageRenderedLink) {
      return Promise.resolve();
    }

    return this.axios.post(trackPageRenderedLink.href);
  }

  public trackPlatformInteraction(subtype: string): Promise<void> {
    const trackLinkEntity = this.getLinkOrThrow('trackPlatformInteractedWith');

    const expandedLink = new Link({
      href: trackLinkEntity.href,
      templated: trackLinkEntity.templated,
    }).getTemplatedLink({ subtype });

    return this.axios.post(expandedLink);
  }
}
