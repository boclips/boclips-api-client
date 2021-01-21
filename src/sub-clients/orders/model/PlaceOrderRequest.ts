import { User } from '../../organisations/model/User';
import { Cart } from '../../carts/model/Cart';
import { DeepPartial } from '../../common/model/DeepPartial';

export interface PlaceOrderRequest {
  user: User;
  cart: DeepPartial<Cart>;
}
