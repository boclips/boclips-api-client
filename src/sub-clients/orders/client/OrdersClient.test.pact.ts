import { OrdersFactory } from './../../../test-support/OrdersFactory';
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
  updateOrderItem,
  updateOrder,
  placeOrderInteraction,
} from '../pact/OrderInteractions';
import { OrderCaptionStatus } from '../model/OrderItem';
import { UserFactory } from '../../../test-support/UserFactory';

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
        expect(order.status).toBeDefined();
        expect(order.totalPrice.value).toEqual(123);
        expect(order.totalPrice.displayValue).toBeDefined();
        expect(order.userDetails.authorisingUser).toEqual(
          'Authoriser Dobinson <authoriser@gmail.com>',
        );
        expect(order.userDetails.requestingUser).toEqual(
          'Requestor Sharma <requestor@gmail.com>',
        );
        expect(order.userDetails.organisation).toBeDefined();

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

      it('can place an order', async () => {
        await provider.addInteraction(placeOrderInteraction());
        const placedOrderId = await client.orders.placeOrder(
          [{ id: '123', videoId: '5c542ab85438cdbcb56ddcee' }],
          UserFactory.sample({
            id: 'b66f6f98-3c5b-49e3-ac1b-2e8def6c95c0',
            email: 'definitely-not-batman@wayne.com',
            firstName: 'Bruce',
            lastName: 'Wayne',
            organisation: {
              id: 'org-id',
              name: 'Wayne Enterprises',
            },
          }),
        );

        expect(placedOrderId).not.toBeNull();
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

      it('can fetch paginated orders', async () => {
        await provider.addInteraction(getOrdersInteraction());
        const orders = await client.orders.getAll(1, 10);

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

      it('can update an order', async () => {
        await provider.addInteraction(
          updateOrder(existingOrderIdFromStaging, {
            currency: 'GBP',
            organisation: 'pb and jelly',
          }),
        );

        const order = OrdersFactory.sample({
          id: existingOrderIdFromStaging,
          links: {
            self: new Link({ href: 'blah' }),
            update: new Link({
              href: `${provider.mockService.baseUrl}/v1/orders/${existingOrderIdFromStaging}`,
            }),
          },
        });

        const updatedOrder = await client.orders.updateOrder(order, {
          currency: 'GBP',
          organisation: 'pb and jelly',
        });

        assertOnMandatoryOrderFields(updatedOrder);
        expect(updatedOrder.totalPrice.currency).toEqual('GBP');
        expect(updatedOrder.userDetails.organisation).toEqual('pb and jelly');
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
