import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';

export interface CartsClient {
  getCart(): Promise<Cart>;
  addItemToCart(cart: Cart, videoId: string): Promise<CartItem>;
}
