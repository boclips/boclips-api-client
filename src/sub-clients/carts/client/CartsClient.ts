import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';

export interface CartsClient {
  get(): Promise<Cart>;
  addItem(cart: Cart, videoId: string): Promise<CartItem>;
}
