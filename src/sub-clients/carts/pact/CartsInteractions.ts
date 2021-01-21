import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, like, term } from '@pact-foundation/pact/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';
import { provider } from '../../../pact-support/pactSetup';
import { AdditionalServices } from '../model/AdditionalServices';
import { CartItem } from '../model/CartItem';

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
        id: 'item-id',
        videoId: 'video-id-1',
        _links: {
          self: like({ href: '/cartItem' }),
        },
      }),
      _links: {
        self: like({ href: '/cartItem' }),
        addItem: like({ href: '/addItem' }),
      },
    },
  },
});

export const updateCartInteraction = (note: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH cart',
  withRequest: {
    method: 'PATCH',
    path: '/v1/cart',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      note,
    },
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
        id: 'item-id',
        videoId: 'video-id-1',
        _links: {
          self: like({ href: '/cartItem' }),
        },
      }),
      note,
      _links: {
        self: like({ href: '/carts' }),
        addItem: like({ href: '/addItem' }),
      },
    },
  },
});

export const postCartsInteraction = (
  videoId: string,
  cartItemId: string = 'cart-item-id',
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST cart ' + videoId,
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
      location: term({
        generate: `${provider.mockService.baseUrl}/v1/cart/items/${videoId}`,
        matcher: `.*/v1/cart/items/.+`,
      }),
    },
    body: {
      videoId: like(videoId),
      id: like(cartItemId),
      _links: {
        self: like({
          href: `${provider.mockService.baseUrl}/v1/cart/items/${cartItemId}`,
        }),
      },
    },
  },
});

export const deleteCartsInteraction = (
  cartItemId: string,
): //
InteractionObject => ({
  state: undefined,
  uponReceiving: 'DELETE cart item',
  withRequest: {
    method: 'DELETE',
    path: '/v1/cart/items/' + cartItemId,
  },
  willRespondWith: {
    status: 204,
  },
});

export const updateCartItemAdditionalServices = (
  cartItem: CartItem,
  additionalServices: AdditionalServices,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH cart item' + cartItem.id,
  withRequest: {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    path: `/v1/cart/items/${cartItem.id}`,
    body: {
      additionalServices,
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
      location: term({
        generate: `${provider.mockService.baseUrl}/v1/cart/items/${cartItem.id}`,
        matcher: `.*/v1/cart/items/.+`,
      }),
    },
    body: {
      items: eachLike({
        id: cartItem.id,
        videoId: 'video-id-1',
        additionalServices: {
          trim: {
            to: like(additionalServices.trim!!.to),
            from: like(additionalServices.trim!!.from),
          },
        },
        _links: {
          self: like({ href: '/cartItem' }),
        },
      }),
      _links: {
        self: like({ href: '/cartItem' }),
        addItem: like({ href: '/addItem' }),
      },
    },
  },
});
