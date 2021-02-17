import { InteractionObject } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import { Collection } from '../../collections/model/Collection';
import { CollectionInteractedWithRequest } from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { SearchQueryCompletionsSuggestedRequest } from '../model/SearchQueryCompletionsSuggestedRequest';

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
  boclipsReferer: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST CollectionInteractedWith event',
  withRequest: {
    method: 'POST',
    path: `/v1/collections/${collection.id}/events`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Boclips-Referer': boclipsReferer,
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
    headers: {
      'Boclips-Referer': like('contract-tests/random?hello=there'),
    },
  },
  willRespondWith: {
    status: 201,
  },
});

export const trackAnonymousPlatformInteraction = (
  subtype: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST AnonymousPlatformInteractedWith event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/platform-interaction`,
    query: `subtype=${subtype}&anonymous=true`,
  },
  willRespondWith: {
    status: 201,
  },
});

export const trackSearchQueryCompletionsSuggested = (
  request: SearchQueryCompletionsSuggestedRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST searchQueryCompletionsSuggested event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/suggested-search-completions`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Boclips-Referer': like('contract-tests/random?hello=there'),
    },
    body: {
      searchQuery: request.searchQuery,
      impressions: request.impressions,
      componentId: request.componentId,
      completionId: request.completionId,
    },
  },
  willRespondWith: {
    status: 201,
  },
});

export const trackVideoInteraction = (
  videoId: string,
  subtype: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST VideoInteractedWith event',
  withRequest: {
    method: 'POST',
    path: `/v1/videos/${videoId}/events`,
    query: `logVideoInteraction=true&type=${subtype}`,
    headers: {
      'Boclips-Referer': like('contract-tests/random?hello=there'),
    },
  },
  willRespondWith: {
    status: 200,
  },
});
