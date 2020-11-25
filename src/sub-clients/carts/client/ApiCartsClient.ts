import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { CartConverter } from '../CartConverter';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';
import { CartsClient } from './CartsClient';

export class ApiCartsClient extends ApiSubClient implements CartsClient {
  public async get(): Promise<Cart> {
    const cartsLink = this.getLinkOrThrow('cart');

    return this.axios
      .get(expandUrlTemplate(cartsLink.href, {}))
      .then((it) => CartConverter.convertCart(it.data));
  }

  public async addItem(cart: Cart, videoId: string): Promise<CartItem> {
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
      .then((it) => it.data);
  }
}
