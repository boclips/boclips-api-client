import { InteractionObject } from '@pact-foundation/pact';
import { Collection } from '../../collections/model/Collection';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';

export const collectionID = '5ddfb388cb01742ee5b6366b';

export const trackPageRendered = (
  request: PageRenderedRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST trackPageRendered event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/page-render`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      url: request.url,
    },
  },
  willRespondWith: {
    status: 201,
  },
});

export const trackUserExpired = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST trackUserExpired event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/expired-user-access`,
  },
  willRespondWith: {
    status: 201,
  },
});

export const trackCollectionInteraction = (
  collection: Collection,
  request: CollectionInteractedWithRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST CollectionInteractedWith event',
  withRequest: {
    method: 'POST',
    path: `/v1/collections/${collection.id}/events`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      subtype: request.subtype,
    },
  },
  willRespondWith: {
    status: 200,
  },
});

export const trackPlatformInteraction = (
  subtype: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST PlatformInteractedWith event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/platform-interaction`,
    query: `subtype=${subtype}`,
  },
  willRespondWith: {
    status: 201,
  },
});
