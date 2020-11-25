import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, like, term } from '@pact-foundation/pact/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';
import { provider } from "../../../pact-support/pactSetup";

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
                _links: {
                    self: like({href: "/cartItem"}),
                }
            }),
            _links: {
                self: like({href: "/cartItem"}),
                addItem: like({href: "/addItem"}),
            }
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
            location: term({
                generate: `${provider.mockService.baseUrl}/v1/cart/items/${videoId}`,
                matcher: `.*/v1/cart/items/.+`,
            }),
        },
        body: {
            videoId: like(videoId),
            id: like('item-id'),
            _links: {
                self: like({href: "/cartItem"}),
            },
        },
    },
});
