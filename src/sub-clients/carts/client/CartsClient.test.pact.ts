import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { Link } from '../../common/model/LinkEntity';

import {
  deleteCartsInteraction,
  getCartsInteraction,
  postCartsInteraction,
} from '../pact/CartsInteractions';

describe('CartsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();
      });

      it('can GET cart, ADD item, UPDATE an item', async () => {
        if (isATestClient(client)) {
          await client.carts.addItemToCart('', 'video-id-1');
        }

        const videoId = 'new-video-id';

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

        const cartItem = await client.carts.addItemToCart(cart, videoId);

        expect(cartItem.videoId).toEqual(videoId);
        expect(cartItem.id).not.toBeNull();
        expect(cartItem.links).not.toBeNull();

        await provider.addInteraction(getCartsInteraction());
        const response = await client.carts.getCart();

        expect(response.items[0].id).not.toBeNull();
        expect(response.items[0].videoId).toEqual('video-id-1');
        expect(response.items[0].links.self.getOriginalLink()).toContain(
          '/cartItem',
        );
        expect(response.links.self.getOriginalLink()).not.toBeNull();
        expect(response.links.addItem.getOriginalLink()).not.toBeNull();






      });

      // it('can ADD item to cart and UPDATE', async () => {
      //   const videoId = 'new-video-id';
      //   await provider.addInteraction(postCartsInteraction(videoId));
      //   const cart = {
      //     items: [],
      //     links: {
      //       self: new Link({ href: 'self', templated: false }),
      //       addItem: new Link({
      //         href: `${provider.mockService.baseUrl}/v1/cart/items`,
      //         templated: false,
      //       }),
      //     },
      //   };
      //
      //   const cartItem = await client.carts.addItemToCart(cart, videoId);
      //
      //   expect(cartItem.videoId).toEqual(videoId);
      //   expect(cartItem.id).not.toBeNull();
      //   expect(cartItem.links).not.toBeNull();
      //
      //   const additionalServices = {
      //     trim: {
      //       from: '0:21',
      //       to: '1:22',
      //     },
      //   };
      //
      //   await provider.addInteraction(
      //     updateCartItemAdditionalServices(cartItem, additionalServices),
      //   );
      //
      //   const updatedCart = await client.carts.updateCartItemAdditionalServices(
      //     cartItem,
      //     additionalServices,
      //   );
      //
      //   const updatedItem = updatedCart.items.find(
      //     (it) => it.id === cartItem.id,
      //   );
      //
      //   expect(updatedItem?.additionalServices?.trim.from).toEqual('0:21');
      //   expect(updatedItem?.additionalServices?.trim.to).toEqual('1:22');
      // });

      it('can delete item from cart', async () => {
        if (isATestClient(client)) {
          await provider.addInteraction(getCartsInteraction());
          const cart = await client.carts.getCart();

          const cartItem = await client.carts.addItemToCart('', 'video-id-1');

          await provider.addInteraction(deleteCartsInteraction(cartItem.id));
          await client.carts.deleteItemFromCart(cart, cartItem.id);

          expect(cart.items).not.toContain(
            expect.arrayContaining([expect.objectContaining(cartItem)]),
          );
        }
      });
    },
  );
});
