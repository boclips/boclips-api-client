import { Link } from '../types';
import { Cart } from '../sub-clients/carts/model/Cart';
import { CartItem } from '../sub-clients/carts/model/CartItem';

export class CartsFactory {
  public static sample(cart: Partial<Cart>): Cart {
    return {
      ...{
        note: 'notes',
        items: [],
        links: {
          self: new Link({ href: 'www.boclips.com/cart' }),
          addItem: new Link({ href: 'www.boclips.com/cart' }),
        },
      },
      ...cart,
    };
  }
}

export class CartItemFactory {
  public static sample(item: Partial<CartItem>): CartItem {
    return {
      ...{
        id: 'cart-item-id',
        videoId: 'video-id',
        additionalServices: null,
        links: {
          self: new Link({
            href: 'www.videos.boclips.com/cart/items/cart-item-id',
          }),
          additionalServices: new Link({
            href:
              'www.videos.boclips.com/cart/items/cart-item-id/additional-services',
          }),
        },
      },
      ...item,
    };
  }
}
