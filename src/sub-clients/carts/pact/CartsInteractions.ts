import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

export const getCartsInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET cart',
  withRequest: {
    method: 'GET',
    path: '/v1/cart',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      items: eachLike({
        videoId: 'video-id-1',
        _links: { self: { href: 'cartItem', templated: false } },
      }),
      _links: {
        self: { href: 'cart', templated: false },
        addItem: { href: 'addItem', templated: false },
      },
    },
  },
});

export const postCartsInteraction = (videoId: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST cart',
  withRequest: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    path: '/v1/cart/items',
    body: {
      videoId: like(videoId),
    },
  },
  willRespondWith: {
    status: 201,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      videoId: like(videoId),
      id: like('item-id'),
      _links: [
        like({rel: "self", href: "cart"}),
        addItem: { href: like('addItem'), templated: false },
      ],
    },
  },
});
