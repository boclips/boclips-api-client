import { CartItemResource } from './CartItemResource';

export interface CartResource {
  note?: string;
  items: CartItemResource[];
  _links: any;
}
