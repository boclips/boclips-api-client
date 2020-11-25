import { CartItemResource } from "./CartItemResource";

export interface CartResource {
  items: CartItemResource[];
  _links: any;
}
