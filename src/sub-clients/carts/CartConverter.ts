import { Link } from '../common/model/LinkEntity';
import { Cart } from './model/Cart';
import { CartItem } from './model/CartItem';
import { CartItemResource } from './model/CartItemResource';
import { CartResource } from './model/CartResource';

export class CartConverter {
  public static convertCart({ items, _links }: CartResource): Cart {
    return {
      items: items.map((it) => this.convertCartItem(it)),
      links: {
        self: new Link(_links.self),
        addItem: new Link(_links.addItem),
      },
    };
  }

  public static convertCartItem({
    id,
    _links,
    videoId,
    additionalServices,
  }: CartItemResource): CartItem {
    return {
      id,
      videoId,
      additionalServices,
      links: { self: new Link(_links.self) },
    };
  }
}
