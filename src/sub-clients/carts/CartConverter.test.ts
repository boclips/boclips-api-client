import { CartConverter } from './CartConverter';

describe('converter', () => {
  it('converting to cart', () => {
    const resource = {
      items: [
        {
          id: 'item-id-1',
          videoId: 'video-id-1',
          additionalServices: {
            trim: {
              from: '1:00',
              to: '2:00',
            },
          },
          _links: { self: { href: 'cartItem', templated: false } },
        },
      ],
      _links: {
        self: { href: 'cart', templated: false },
        addItem: { href: 'addItem', templated: false },
      },
    };

    const cart = CartConverter.convertCart(resource);

    expect(cart.items[0].videoId).toEqual('video-id-1');
    expect(cart.items[0].additionalServices?.trim.from).toEqual('1:00');
    expect(cart.items[0].additionalServices?.trim.to).toEqual('2:00');

    expect(cart.items[0].links.self.getOriginalLink()).toEqual('cartItem');
    expect(cart.links.self.getOriginalLink()).toEqual('cart');
    expect(cart.links.addItem.getOriginalLink()).toEqual('addItem');
  });
});
