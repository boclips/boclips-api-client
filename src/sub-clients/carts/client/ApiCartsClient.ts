import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CartConverter } from '../CartConverter';
import { AdditionalServices } from '../model/AdditionalServices';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';
import { CartsClient } from './CartsClient';

export class ApiCartsClient extends ApiSubClient implements CartsClient {
  public async getCart(): Promise<Cart> {
    const cartsLink = this.getLinkOrThrow('cart');

    return this.axios
      .get(expandUrlTemplate(cartsLink.href, {}))
      .then((it) => CartConverter.convertCart(it.data));
  }

  public async addItemToCart(cart: Cart, videoId: string): Promise<CartItem> {
    const orderLink = cart.links.addItem.getOriginalLink();

    return this.axios
      .post(
        orderLink,
        { videoId },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((it) => CartConverter.convertCartItem(it.data));
  }

  public async updateCart(note: string): Promise<Cart> {
    const cartsLink = this.getLinkOrThrow('cart');

    return this.axios
      .patch(
        cartsLink.href,
        { note },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((it) => CartConverter.convertCart(it.data));
  }

  public async updateCartItemAdditionalServices(
    cartItem: CartItem,
    additionalServices: Partial<AdditionalServices>,
  ): Promise<Cart> {
    const updateLink = cartItem.links.self.getOriginalLink();

    return this.axios
      .patch(updateLink, additionalServices, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((it) => CartConverter.convertCart(it.data));
  }

  public async deleteItemFromCart(
    cart: Cart,
    cartItemId: string,
  ): Promise<void> {
    const orderLink = cart.items
      .find((it) => it.id === cartItemId)!!
      .links.self.getOriginalLink();

    return this.axios.delete(orderLink);
  }
}
