import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import {
  withClients,
  WithClientsOptions,
} from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support/FakeBoclipsClient';
import { OrderItemFactory } from '../../../test-support/OrderFactory';
import { Link } from '../../../types';
import { getOrdersInteractions } from '../pact/OrderInteractions';
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
            id: '123',
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

      it('can fetch all orders', async () => {
        await provider.addInteraction(getOrdersInteractions());
        const response = await client.ordersClient.getAll();

        expect(response).toHaveLength(1);
        const order = response[0];
        expect(order.id).toEqual('123');
        expect(order.createdAt.toISOString()).toEqual(
          '2019-11-06T18:48:51.061Z',
        );
        expect(order.updatedAt.toISOString()).toEqual(
          '2019-11-06T18:48:51.061Z',
        );
        expect(order.legacyOrderId).toEqual('legacy-order-id');
        expect(order.status).toEqual('COMPLETED');
        expect(order.totalPrice).toEqual({
          displayValue: 'USD 123',
          value: 123,
        });
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
      });
    },
  );
});
