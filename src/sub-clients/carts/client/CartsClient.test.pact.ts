import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { Link } from '../../common/model/LinkEntity';
import {
  getCartsInteraction,
  postCartsInteraction,
} from '../pact/CartsInteractions';

describe('CartsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          await client.carts.addItem('', 'video-id-1');
        }
      });

      it('can get cart', async () => {
        await provider.addInteraction(getCartsInteraction());
        const response = await client.carts.get();

        expect(response.items[0].videoId).toEqual('video-id-1');
        expect(response.items[0].links.self.getOriginalLink()).toEqual(
          'cartItem',
        );
      });

      it('can add item to cart', async () => {
        const videoId = 'video-id';
        await provider.addInteraction(postCartsInteraction(videoId));
        const cart = {
          items: [],
          links: {
            self: new Link({ href: 'self', templated: false }),
            addItem: new Link({
              href: `${provider.mockService.baseUrl}/v1/cart/items`,
              templated: false,
            }),
          },
        };
        const response = await client.carts.addItem(cart, videoId);

        expect(response.videoId).toEqual(videoId);
        expect(response.id).not.toBeNull();
        expect(response.links).not.toBeNull();
      });
    },
  );
});
