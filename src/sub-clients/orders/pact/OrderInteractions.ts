import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';

const { eachLike } = Matchers;

export const existingOrderIdFromStaging = '5d8cec1a05d668000157f7e1';

const createOrderItemWithMandatoryFields = () => ({
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
});

const createOrderWithMandatoryFields = (id: string) => ({
  id,
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
  items: eachLike(createOrderItemWithMandatoryFields()),
});

export const getOrdersInteraction = (): InteractionObject => ({
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
        orders: eachLike(
          createOrderWithMandatoryFields(existingOrderIdFromStaging),
        ),
      },
    },
  },
});

export const getOrderInteraction = (
  id: string = existingOrderIdFromStaging,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET order',
  withRequest: {
    method: 'GET',
    path: `/v1/orders/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      ...createOrderWithMandatoryFields(existingOrderIdFromStaging),
      ...{
        totalPrice: like({
          currency: 'USD',
          value: 123,
          displayValue: 'USD 123',
        }),
        throughPlatform: true,
        isbnNumber: 'isbn-number',
        items: eachLike({
          ...createOrderItemWithMandatoryFields(),
          ...{
            price: {
              value: 123,
              currency: 'USD',
              displayValue: 'USD 123',
            },
            transcriptRequested: false,
            licenseDuration: '5 Years',
            licenseTerritory: 'World Wide',
          },
        }),
      },
    }),
  },
});

export const updateOrderCurrency = (
  id: string,
  currency: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'Patch order',
  withRequest: {
    method: 'PATCH',
    path: `/v1/orders/${id}`,
    query: `currency=${currency}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      ...createOrderWithMandatoryFields(id),
      ...{ totalPrice: { currency, value: 123, displayValue: 'USD 123' } },
    }),
  },
});
