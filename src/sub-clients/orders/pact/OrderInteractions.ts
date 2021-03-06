import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { OrderStatus } from '../model/Order';
import { OrderItemUpdateRequest } from './../model/OrderItemUpdateRequest';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';
import { term } from '@pact-foundation/pact/src/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';

const { eachLike, like } = Matchers;

export const existingOrderIdFromStaging = '5d8cec1a05d668000157f7e1';
export const exisitngOrderItemIdForStaging =
  '493105a2-ee4b-4d10-9916-58cca5944c02';

const createOrderItemWithMandatoryFields = (id: string) => ({
  id,
  video: {
    id: '123',
    types: eachLike('NEWS'),
    title: 'The video title',
    videoReference: 'The video is a good one',
    maxResolutionAvailable: false,
    captionStatus: 'AVAILABLE',
    _links: {
      fullProjection: { href: '/v1/vieos/123?projection=full' },
      captionAdmin: {
        href: 'https://greatcaptionz4u.edu',
      },
      videoUpload: { href: 'https://greatvids4me.io' },
    },
  },
  channel: like({
    name: 'content-partner name',
    id: 'content-partner id',
  }),
  _links: {
    updatePrice: {
      href: '/v1/orders/123/items/456?price={price}',
    },
    update: {
      href: '/v1/orders/123/items/456',
    },
  },
});

const createOrderWithMandatoryFields = (id: string) => ({
  id,
  createdAt: new Date(Date.UTC(2020, 1, 2, 3, 4, 5)).toUTCString(),
  updatedAt: new Date(Date.UTC(2020, 1, 2, 3, 4, 5)).toUTCString(),
  searchableOrderId: 'legacy-or-regular-order-id',
  status: 'READY',
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
  items: eachLike(
    createOrderItemWithMandatoryFields(exisitngOrderItemIdForStaging),
  ),
});

export const getAllOrdersInteraction = (): InteractionObject => ({
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

export const getUserOrdersInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET orders items',
  withRequest: {
    method: 'GET',
    path: '/v1/orders/items',
    query: {
      page: '0',
      size: '10',
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: {
      _embedded: {
        orders: eachLike(
          createOrderWithMandatoryFields(existingOrderIdFromStaging),
        ),
      },
      page: like({
        number: 1,
        size: 10,
        totalElements: 1,
        totalPages: 1,
      }),
    },
  },
});

export const placeOrderInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST orders',
  withRequest: {
    method: 'POST',
    path: '/v1/orders',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      note: 'i am a note',
      items: [
        {
          id: '123',
          videoId: '5c542ab85438cdbcb56ddcee',
          additionalServices: {
            captionsRequested: true,
            editRequest: 'please do some nice editing',
            trim: {
              from: '0:30',
              to: '1:00',
            },
          },
        },
      ],
      user: {
        id: '332eadf7-0b69-4fad-a919-2b210b8325c4',
        email: 'definitely-not-batman@wayne.com',
        firstName: 'Bruce',
        lastName: 'Wayne',
        organisation: {
          id: 'org-id',
          name: 'Wayne Enterprises',
        },
      },
    },
  },
  willRespondWith: {
    status: 201,
    headers: {
      location: term({
        generate: `${provider.mockService.baseUrl}/v1/orders/5fd8e4f1dd022a5e461aecfa`,
        matcher: `.*/v1/orders/.+`,
      }),
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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: like({
      ...createOrderWithMandatoryFields(existingOrderIdFromStaging),
      ...{
        totalPrice: like({
          currency: 'USD',
          value: 123,
          displayValue: 'USD 123',
        }),
        isbnNumber: 'isbn-number',
        items: eachLike({
          ...createOrderItemWithMandatoryFields(exisitngOrderItemIdForStaging),
          ...{
            price: {
              value: 123,
              currency: 'USD',
              displayValue: 'USD 123',
            },
            captionsRequested: false,
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
  uponReceiving: 'Patch order currency',
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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: like({
      ...createOrderWithMandatoryFields(id),
      ...{ totalPrice: { currency, value: 123, displayValue: 'USD 123' } },
    }),
  },
});

export const updateOrder = (
  id: string,
  updateRequest: OrderUpdateRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'Patch order',
  withRequest: {
    method: 'PATCH',
    path: `/v1/orders/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: updateRequest,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: like({
      ...createOrderWithMandatoryFields(id),
      userDetails: {
        ...createOrderWithMandatoryFields(exisitngOrderItemIdForStaging)
          .userDetails,
        organisationLabel: updateRequest.organisation,
      },
      status: OrderStatus.DELIVERED,
      totalPrice: {
        ...createOrderWithMandatoryFields(exisitngOrderItemIdForStaging)
          .totalPrice.contents,
        currency: updateRequest.currency,
      },
    }),
  },
});

export const updateOrderItem = (
  orderId: string,
  orderItemId: any,
  request: OrderItemUpdateRequest,
  description: string = 'Patch order item',
): InteractionObject => ({
  state: undefined,
  uponReceiving: description,
  withRequest: {
    method: 'PATCH',
    path: `/v1/orders/${orderId}/items/${orderItemId}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: request,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: like({
      ...createOrderWithMandatoryFields(orderId),
      ...{
        items: [
          {
            ...createOrderItemWithMandatoryFields(
              exisitngOrderItemIdForStaging,
            ),
            ...{
              price: { value: request.price },
              licenseDuration: request.license?.duration,
              licenseTerritory: request.license?.territory,
            },
          },
        ],
      },
    }),
  },
});
