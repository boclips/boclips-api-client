import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
// import { provider } from '../../../pact-support/pactSetup';

const { eachLike } = Matchers;

export const getOrdersInteractions = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET orders',
  withRequest: {
    method: 'GET',
    path: '/v1/orders',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        orders: eachLike({
          id: '123',
          createdAt: '2019-11-06T18:48:51.061',
          updatedAt: '2019-11-06T18:48:51.061',
          legacyOrderId: 'legacy-order-id',
          status: 'COMPLETED',
          totalPrice: like({
            displayValue: 'USD 123',
            value: 123,
          }),
          userDetails: {
            authorisingUserLabel: 'Authoriser Dobinson <authoriser@gmail.com>',
            requestingUserLabel: 'Requestor Sharma <requestor@gmail.com>',
            organisationLabel: 'The Organisation',
          },
          _links: {
            self: {
              href: '/v1/orders/123',
            },
          },
          items: eachLike({
            video: {
              id: '123',
              type: 'NEWS',
              title: 'The video title',
              videoReference: 'The video is a good one',
            },
            contentPartner: like({
              name: 'content-partner name',
              id: 'content-partner id',
            }),
            _links: {
              updatePrice: {
                href: '/v1/orders/123/items/456?price={price}',
                templated: true,
              },
              update: {
                href: '/v1/orders/123/items/456',
              },
            },
          }),
        }),
      },
    },
  },
});
