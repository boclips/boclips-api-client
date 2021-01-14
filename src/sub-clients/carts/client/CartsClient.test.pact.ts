import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { Link } from '../../common/model/LinkEntity';
import { Cart } from '../model/Cart';
import {
  deleteCartsInteraction,
  getCartsInteraction,
  postCartsInteraction,
  updateCartItemAdditionalServices,
} from '../pact/CartsInteractions';

describe('CartsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();
      });

      it('can get cart', async () => {
        if (isATestClient(client)) {
          await client.carts.addItemToCart('', 'video-id-1');
        }

        await provider.addInteraction(getCartsInteraction());
        const response = await client.carts.getCart();

        expect(response.items[0].id).not.toBeNull();
        expect(response.items[0].videoId).toEqual('video-id-1');
        expect(response.items[0].links.self.getOriginalLink()).toEqual(
          '/cartItem',
        );
        expect(response.links.self.getOriginalLink()).not.toBeNull();
        expect(response.links.addItem.getOriginalLink()).not.toBeNull();
      });

      it('can add item to cart', async () => {
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
        const response = await client.carts.addItemToCart(cart, videoId);

        expect(response.videoId).toEqual(videoId);
        expect(response.id).not.toBeNull();
        expect(response.links).not.toBeNull();
      });

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

      it('can update additional services in cart item', async () => {
        const videoId = 'new-video-id-2';

        const cart: Cart = {
          items: [],
          links: {
            self: new Link({ href: 'self', templated: false }),
            addItem: new Link({
              href: `${provider.mockService.baseUrl}/v1/cart/items`,
              templated: false,
            }),
          },
        };

        const additionalServices = {
          trim: {
            from: '0:21',
            to: '1:22',
          },
        };

        await provider.addInteraction(postCartsInteraction(videoId, '123'));

        const cartItem = await client.carts.addItemToCart(cart, videoId);

        await provider.addInteraction(
          updateCartItemAdditionalServices(cartItem, additionalServices),
        );

        const updatedCart = await client.carts.updateCartItemAdditionalServices(
          cartItem,
          additionalServices,
        );

        const updatedItem = updatedCart.items.find(
          (it) => it.id === cartItem.id,
        );

        expect(updatedItem?.additionalServices?.trim.from).toEqual('0:21');
        expect(updatedItem?.additionalServices?.trim.to).toEqual('1:22');
      });
    },
  );
});
