import { Link } from '../../common/model/LinkEntity';
import { CartItem } from './CartItem';

export interface Cart {
  note?: string;
  items: CartItem[];
  links: { self: Link; addItem: Link };
}
