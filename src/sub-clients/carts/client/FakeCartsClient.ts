import { CartsFactory } from '../../../test-support/CartsFactory';
import { Link } from '../../common/model/LinkEntity';
import { Clearable } from '../../common/utils/Clearable';
import { AdditionalServices } from '../model/AdditionalServices';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';
import { CartsClient } from './CartsClient';

export class FakeCartsClient implements CartsClient, Clearable {
  private cart: Cart = this.getEmptyCart();
  private generateItemId = () => {
    return (this.cart.items.length + 1).toString();
  };

  private createCartItem = (videoId: string): CartItem => {
    return {
      id: this.generateItemId(),
      videoId,
      additionalServices: null,
      links: {
        self: new Link({ href: `/cartItem`, templated: false }),
        additionalServices: new Link({
          href: `/cartItem/123/additional-services`,
          templated: true,
        }),
      },
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

  public async updateCart(note: string): Promise<Cart> {
    this.cart.note = note;
    return Promise.resolve(this.cart);
  }

  public deleteItemFromCart(_: any, cartItemId: string): Promise<void> {
    const cartItemIds = this.cart.items.map((it) => it.id);
    const cartItemIndex = cartItemIds.indexOf(cartItemId);

    this.cart.items.splice(cartItemIndex, 1);

    return Promise.resolve();
  }

  public updateCartItemAdditionalServices(
    cartItem: CartItem,
    additionalServices: AdditionalServices,
  ): Promise<Cart> {
    cartItem.additionalServices = additionalServices;

    this.cart.items.push(cartItem);

    return Promise.resolve(this.cart);
  }

  public clear() {
    this.cart = this.getEmptyCart();
  }

  private getEmptyCart(): Cart {
    return CartsFactory.sample({ items: [], note: undefined });
  }
}
