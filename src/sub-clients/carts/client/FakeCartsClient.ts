import { Link } from '../../common/model/LinkEntity';
import { Clearable } from '../../common/utils/Clearable';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';
import { CartsClient } from './CartsClient';

const emptyCart = {
  items: [],
  links: {
    self: new Link({ href: '/cart', templated: false }),
    addItem: new Link({ href: '/addItem', templated: false }),
  },
};

export class FakeCartsClient implements CartsClient, Clearable {
  private cart: Cart = { ...emptyCart };
  private generateItemId = () => {
    return (this.cart.items.length + 1).toString();
  };
  private createCartItem = (videoId: string) => {
    return {
      id: this.generateItemId(),
      videoId,
      links: { self: new Link({ href: `/cartItem`, templated: false }) },
    };
  };

  public getCart(): Promise<Cart> {
    return Promise.resolve(this.cart);
  }

  public insertCartItem(videoId: string) {
    this.cart.items.push(this.createCartItem(videoId));
  }

  public addItemToCart(_: any, videoId: string): Promise<CartItem> {
    const cartItem = this.createCartItem(videoId);
    this.cart.items.push(cartItem);

    return Promise.resolve(cartItem);
  }

  public clear() {
    this.cart = emptyCart;
  }
}
