import { CartConverter } from './CartConverter';

describe('converter', () => {
  it('converting to cart', () => {
    const resource = {
      items: [
        {
          id: 'item-id-1',
          videoId: 'video-id-1',
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
    expect(cart.items[0].links.self.getOriginalLink()).toEqual('cartItem');
    expect(cart.links.self.getOriginalLink()).toEqual('cart');
    expect(cart.links.addItem.getOriginalLink()).toEqual('addItem');
  });
});