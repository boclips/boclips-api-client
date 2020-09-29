import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import {
  FakeBoclipsClient,
  isATestClient,
  OrderItemFactory,
} from '../../../test-support';
import { Link } from '../../../types';
import { Order, OrderStatus } from '../model/Order';
import {
  exisitngOrderItemIdForStaging,
  existingOrderIdFromStaging,
  getOrderInteraction,
  getOrdersInteraction,
  updateOrderCurrency,
  updateOrderItem, updateOrderOrganisation,
} from '../pact/OrderInteractions';
import { OrderCaptionStatus } from '../model/OrderItem';

describe('OrdersClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          const fake = client.orders;
          fake.insertOrderFixture({
            id: existingOrderIdFromStaging,
            createdAt: new Date(Date.UTC(2020, 1, 2, 3, 4, 5)),
            updatedAt: new Date(Date.UTC(2020, 1, 2, 3, 4, 5)),
            status: OrderStatus.READY,
            userDetails: {
              authorisingUser: 'Authoriser Dobinson <authoriser@gmail.com>',
              requestingUser: 'Requestor Sharma <requestor@gmail.com>',
              organisation: 'The Organisation',
            },
            totalPrice: {
              displayValue: 'USD 123',
              value: 123,
              currency: 'USD',
            },
            items: [
              OrderItemFactory.sample({
                id: exisitngOrderItemIdForStaging,
                video: {
                  id: '123',
                  types: ['NEWS'],
                  title: 'The video title',
                  videoReference: 'The video is a good one',
                  captionStatus: OrderCaptionStatus.AVAILABLE,
                  maxResolutionAvailable: false,
                  _links: {
                    fullProjection: new Link({
                      href: '/v1/vieos/123?projection=full',
                    }),
                    captionAdmin: new Link({
                      href: 'https://greatcaptionz4u.edu',
                    }),
                    videoUpload: new Link({ href: 'https://greatvids4me.io' }),
                  },
                },
                channel: {
                  id: 'content-partner id',
                  name: 'content-partner name',
                },
                license: { territory: 'World Wide', duration: '5 Years' },
                transcriptRequested: false,
                links: {
                  update: new Link({
                    href: '/v1/orders/123/items/456',
                  }),
                  updatePrice: new Link({
                    href: '/v1/orders/123/items/456?price={price}',
                  }),
                },
              }),
            ],
          });
        }
      });

      const assertOnMandatoryOrderFields = (order: Order) => {
        expect(order.id).toEqual(existingOrderIdFromStaging);
        expect(order.createdAt.toUTCString()).toEqual(
          'Sun, 02 Feb 2020 03:04:05 GMT',
        );
        expect(order.updatedAt.toUTCString()).toEqual(
          'Sun, 02 Feb 2020 03:04:05 GMT',
        );
        expect(order.legacyOrderId).toEqual('legacy-order-id');
        expect(order.status).toEqual(OrderStatus.READY);
        expect(order.totalPrice.displayValue).toEqual('USD 123');
        expect(order.totalPrice.value).toEqual(123);
        expect(order.userDetails).toEqual({
          authorisingUser: 'Authoriser Dobinson <authoriser@gmail.com>',
          requestingUser: 'Requestor Sharma <requestor@gmail.com>',
          organisation: 'The Organisation',
        });

        expect(order.items).toHaveLength(1);
        const firstOrderItem = order.items[0];

        expect(firstOrderItem.id).toEqual(exisitngOrderItemIdForStaging);
        expect(firstOrderItem.channel).toEqual({
          id: 'content-partner id',
          name: 'content-partner name',
        });
        expect(firstOrderItem.video).toEqual({
          id: '123',
          types: ['NEWS'],
          title: 'The video title',
          videoReference: 'The video is a good one',
          captionStatus: OrderCaptionStatus.AVAILABLE,
          maxResolutionAvailable: false,
          _links: {
            fullProjection: new Link({ href: '/v1/vieos/123?projection=full' }),
            captionAdmin: new Link({
              href: 'https://greatcaptionz4u.edu',
            }),
            videoUpload: new Link({ href: 'https://greatvids4me.io' }),
          },
        });
        expect(firstOrderItem.links.updatePrice.getOriginalLink()).toEqual(
          '/v1/orders/123/items/456?price={price}',
        );
        expect(firstOrderItem.links.update.getOriginalLink()).toEqual(
          '/v1/orders/123/items/456',
        );
      };

      it('can fetch all orders', async () => {
        await provider.addInteraction(getOrdersInteraction());
        const orders = await client.orders.getAll();

        expect(orders).toHaveLength(1);
        const order = orders[0];
        assertOnMandatoryOrderFields(order);
      });

      it('can fetch an order', async () => {
        await provider.addInteraction(
          getOrderInteraction(existingOrderIdFromStaging),
        );

        const order = await client.orders.get(existingOrderIdFromStaging);
        assertOnMandatoryOrderFields(order!);

        expect(order!.totalPrice.currency).toEqual('USD');

        const item = order!.items[0];
        expect(item.license?.duration).toEqual('5 Years');
        expect(item.license?.territory).toEqual('World Wide');
        expect(item.transcriptRequested).toBeFalsy();
      });

      it('can update the currency of an order', async () => {
        await provider.addInteraction(
          updateOrderCurrency(existingOrderIdFromStaging, 'GBP'),
        );

        const updatedOrder = await client.orders.updateCurrency(
          existingOrderIdFromStaging,
          'GBP',
        );

        assertOnMandatoryOrderFields(updatedOrder);
        expect(updatedOrder.totalPrice.currency).toEqual('GBP');
      });

      it('can update the organisation of an order', async () => {
        await provider.addInteraction(updateOrderOrganisation(existingOrderIdFromStaging, {organisation:'A super awesome org'}),
        );

        const updatedOrder = await client.orders.updateOrganisation(
          existingOrderIdFromStaging,
            {organisation:'A super awesome org'} ,
        );

        expect(updatedOrder.userDetails.organisation).toEqual('A super awesome org');
      });

      it('can update the price and license of an order item', async () => {
        const updateRequest = {
          price: 100,
          license: { duration: '10 years', territory: 'Europe' },
        };
        const orderItemToUpdate = OrderItemFactory.sample({
          id: exisitngOrderItemIdForStaging,
          links: {
            update: new Link({
              href: `${provider.mockService.baseUrl}/v1/orders/${existingOrderIdFromStaging}/items/${exisitngOrderItemIdForStaging}`,
            }),
            updatePrice: new Link({
              href: '',
            }),
          },
        });

        await provider.addInteraction(
          updateOrderItem(
            existingOrderIdFromStaging,
            exisitngOrderItemIdForStaging,
            updateRequest,
          ),
        );

        const updatedOrder = await client.orders.updateItem(
          orderItemToUpdate,
          updateRequest,
        );

        expect(updatedOrder.id).toEqual(existingOrderIdFromStaging);
        const updatedItem = updatedOrder.items[0];

        expect(updatedItem.price?.value).toEqual(updateRequest.price);
        expect(updatedItem.license).toEqual(updateRequest.license);
      });

      it('can update just the license of an order item', async () => {
        const updateRequest = {
          license: { duration: '10 years', territory: 'Europe' },
        };
        const orderItemToUpdate = OrderItemFactory.sample({
          id: exisitngOrderItemIdForStaging,
          links: {
            update: new Link({
              href: `${provider.mockService.baseUrl}/v1/orders/${existingOrderIdFromStaging}/items/${exisitngOrderItemIdForStaging}`,
            }),
            updatePrice: new Link({
              href: '',
            }),
          },
        });

        await provider.addInteraction(
          updateOrderItem(
            existingOrderIdFromStaging,
            exisitngOrderItemIdForStaging,
            updateRequest,
            'Patching just the license',
          ),
        );

        const updatedOrder = await client.orders.updateItem(
          orderItemToUpdate,
          updateRequest,
        );

        expect(updatedOrder.id).toEqual(existingOrderIdFromStaging);
        const updatedItem = updatedOrder.items[0];

        expect(updatedItem.license).toEqual(updateRequest.license);
      });
    },
  );
});
