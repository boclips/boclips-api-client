import { OrderConverter } from './OrderConverter';

describe('OrderConvert', () => {
  it('Includes trimming information in response', () => {
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

    expect(convertedOrder.items[0].trim).toEqual('20-40');
  });
});
