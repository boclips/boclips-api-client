import { OrderConverter } from './OrderConverter';
import { Order } from './model/Order';
import { OrderCaptionStatus, OrderItem } from './model/OrderItem';

describe('OrderConvert', () => {
  it('converts Order', () => {
    const orderResource = {
      status: 123,
      statusText: 'pending',
      headers: '',
      config: {},
      request: 'any',
      data: {
        id: 'I am an order',
        legacyOrderId: 'I am a legacy order',
        userDetails: {
          requestingUserLabel: undefined,
          authorisingUserLabel: undefined,
          organisationLabel: undefined,
        },
        status: 'READY',
        createdAt: '2020-09-18T14:19:55.612Z',
        updatedAt: '2020-09-18T14:19:55.612Z',
        deliveryDate: '2020-09-18T14:19:55.612Z',
        isbnNumber: '',
        _links: {
          updatePrice: {
            href: '/v1/orders/123/items/456?price={price}',
            templated: true,
          },
          update: {
            href: '/v1/orders/123/items/456',
            templated: true,
          },
        },
        items: [
          {
            transcriptRequested: true,
            channel: {
              id: '5d5d61220726b741db534ba8',
              name: 'Dow Jones',
              currency: 'EUR',
            },
            video: {
              id: '123',
              types: ['instructional clips'],
              title: 'The greatest video',
              videoReference: '3240536A-E9F9-4470-97AB-F24EB32BA414',
              maxResolutionAvailable: true,
              captionStatus: 'REQUESTED',
              _links: {
                updatePrice: {
                  href: '/v1/orders/123/items/456?price={price}',
                  templated: true,
                },
                update: {
                  href: '/v1/orders/123/items/456',
                  templated: true,
                },
              },
            },
            trim: '20-40',
            id: 'String',
            _links: {
              updatePrice: {
                href: '/v1/orders/123/items/456?price={price}',
                templated: true,
              },
              update: {
                href: '/v1/orders/123/items/456',
                templated: true,
              },
            },
          },
        ],
        totalPrice: { value: 0, currency: null, displayValue: '0.00' },
      },
    };

    const convertedOrder = OrderConverter.convertResource(orderResource);

    assertConvertedOrder(convertedOrder, orderResource);
  });
  it('converts order with delivery date of null', () => {
    const orderResource = {
      status: 123,
      statusText: 'pending',
      headers: '',
      config: {},
      request: 'any',
      data: {
        id: 'I am an order',
        legacyOrderId: 'I am a legacy order',
        userDetails: {
          requestingUserLabel: undefined,
          authorisingUserLabel: undefined,
          organisationLabel: undefined,
        },
        status: 'READY',
        createdAt: '2020-09-18T14:19:55.612Z',
        updatedAt: '2020-09-18T14:19:55.612Z',
        deliveryDate: '2020-09-18T14:19:55.612Z',
        isbnNumber: '',
        _links: {
          updatePrice: {
            href: '/v1/orders/123/items/456?price={price}',
            templated: true,
          },
          update: {
            href: '/v1/orders/123/items/456',
            templated: true,
          },
        },
        items: [
          {
            transcriptRequested: true,
            channel: {
              id: '5d5d61220726b741db534ba8',
              name: 'Dow Jones',
              currency: 'EUR',
            },
            video: {
              id: '123',
              types: ['instructional clips'],
              title: 'The greatest video',
              videoReference: '3240536A-E9F9-4470-97AB-F24EB32BA414',
              maxResolutionAvailable: true,
              captionStatus: 'REQUESTED',
              _links: {
                updatePrice: {
                  href: '/v1/orders/123/items/456?price={price}',
                  templated: true,
                },
                update: {
                  href: '/v1/orders/123/items/456',
                  templated: true,
                },
              },
            },
            trim: '20-40',
            id: 'String',
            _links: {
              updatePrice: {
                href: '/v1/orders/123/items/456?price={price}',
                templated: true,
              },
              update: {
                href: '/v1/orders/123/items/456',
                templated: true,
              },
            },
          },
        ],
        totalPrice: { value: 0, currency: null, displayValue: '0.00' },
      },
    };

    const convertedOrder = OrderConverter.convertResource(orderResource);

    assertConvertedOrder(convertedOrder, orderResource);
  });

  const assertConvertedOrder = (converted: Order, orderResource: any) => {
    expect(converted.id).toEqual(orderResource.data.id);
    expect(converted.legacyOrderId).toEqual(orderResource.data.legacyOrderId);
    expect(converted.userDetails).toEqual(orderResource.data.userDetails);
    expect(converted.status).toEqual(orderResource.data.status);
    expect(converted.totalPrice).toEqual(orderResource.data.totalPrice);
    expect(converted.isbnNumber).toEqual(orderResource.data.isbnNumber);
    expect(converted.deliveryDate).toEqual(
      new Date(orderResource.data.deliveryDate),
    );
    expect(converted.createdAt).toEqual(new Date(orderResource.data.createdAt));
    expect(converted.updatedAt).toEqual(new Date(orderResource.data.updatedAt));
    expect(converted.transcriptRequested).toEqual(
      orderResource.data.transcriptRequested,
    );

    assertConvertedOrderItem(converted.items, orderResource);
  };

  const assertConvertedOrderItem = (
    convertedItem: OrderItem[],
    orderItemResource: any,
  ) => {
    expect(convertedItem[0].id).toEqual(orderItemResource.data.items[0].id);
    expect(convertedItem[0].channel).toEqual(
      orderItemResource.data.items[0].channel,
    );
    expect(convertedItem[0].license?.territory).toEqual(
      orderItemResource.data.items[0].licenseTerritory,
    );
    expect(convertedItem[0].license?.duration).toEqual(
      orderItemResource.data.items[0].licenseDuration,
    );
    expect(convertedItem[0].transcriptRequested).toEqual(
      orderItemResource.data.items[0].transcriptRequested,
    );
    expect(convertedItem[0].price).toEqual(
      orderItemResource.data.items[0].price,
    );
    expect(convertedItem[0].trim).toEqual(orderItemResource.data.items[0].trim);
    expect(convertedItem[0].trim).toEqual(orderItemResource.data.items[0].trim);
    expect(convertedItem[0].video.captionStatus).toEqual(
      OrderCaptionStatus[orderItemResource.data.items[0].video.captionStatus],
    );

    expect(convertedItem[0].links?.updatePrice.getOriginalLink()).toEqual(
      orderItemResource.data.items[0]._links.updatePrice.href,
    );
    expect(convertedItem[0].links?.update.getOriginalLink()).toEqual(
      orderItemResource.data.items[0]._links.update.href,
    );
  };
});
