import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import {
  withClients,
  WithClientsOptions,
} from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support/FakeBoclipsClient';
import { OrderItemFactory } from '../../../test-support/OrderFactory';
import { Link } from '../../../types';
import { Order } from '../model/Order';
import {
  existingOrderIdFromStaging,
  getOrderInteraction,
  getOrdersInteraction,
} from '../pact/OrderInteractions';
import { FakeOrdersClient } from './FakeOrdersClient';

describe('OrdersClient', () => {
  withClients(
    (
      getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>,
      options: WithClientsOptions,
    ) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (!options.isRealClient) {
          const fake = client.ordersClient as FakeOrdersClient;
          fake.insertOrderFixture({
            id: existingOrderIdFromStaging,
            createdAt: new Date('2019-11-06T18:48:51.061Z'),
            updatedAt: new Date('2019-11-06T18:48:51.061Z'),
            status: 'COMPLETED',
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
                video: {
                  id: '123',
                  type: 'NEWS',
                  title: 'The video title',
                  videoReference: 'The video is a good one',
                },
                contentPartner: {
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
        expect(order.createdAt.toISOString()).toEqual(
          '2019-11-06T18:48:51.061Z',
        );
        expect(order.updatedAt.toISOString()).toEqual(
          '2019-11-06T18:48:51.061Z',
        );
        expect(order.legacyOrderId).toEqual('legacy-order-id');
        expect(order.status).toEqual('COMPLETED');
        expect(order.totalPrice.displayValue).toEqual('USD 123');
        expect(order.totalPrice.value).toEqual(123);
        expect(order.userDetails).toEqual({
          authorisingUser: 'Authoriser Dobinson <authoriser@gmail.com>',
          requestingUser: 'Requestor Sharma <requestor@gmail.com>',
          organisation: 'The Organisation',
        });

        expect(order.items).toHaveLength(1);
        const firstOrderItem = order.items[0];

        expect(firstOrderItem.contentPartner).toEqual({
          id: 'content-partner id',
          name: 'content-partner name',
        });
        expect(firstOrderItem.video).toEqual({
          id: '123',
          type: 'NEWS',
          title: 'The video title',
          videoReference: 'The video is a good one',
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
        const orders = await client.ordersClient.getAll();

        expect(orders).toHaveLength(1);
        const order = orders[0];
        assertOnMandatoryOrderFields(order);
      });

      it('can fetch an order', async () => {
        await provider.addInteraction(
          getOrderInteraction(existingOrderIdFromStaging),
        );

        const order = await client.ordersClient.get(existingOrderIdFromStaging);
        assertOnMandatoryOrderFields(order);

        expect(order.totalPrice.currency).toEqual('USD');

        const item = order.items[0];
        expect(item.license.duration).toEqual('5 Years');
        expect(item.license.territory).toEqual('World Wide');
        expect(item.transcriptRequested).toBeFalsy();
      });
    },
  );
});
