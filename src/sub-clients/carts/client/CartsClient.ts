import { AdditionalServices } from '../model/AdditionalServices';
import { Cart } from '../model/Cart';
import { CartItem } from '../model/CartItem';

export interface CartsClient {
  getCart(): Promise<Cart>;
  updateCart(note: string): Promise<Cart>;
  addItemToCart(cart: Cart, videoId: string): Promise<CartItem>;
  deleteItemFromCart(cart: Cart, cartItemId: string): Promise<void>;
  updateCartItemAdditionalServices(
    cartItem: CartItem,
    additionalServices: AdditionalServices,
  ): Promise<Cart>;
}
