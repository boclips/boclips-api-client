import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';

export interface OrdersClient {
  get(id: string): Promise<Order>;
  getAll(): Promise<Order[]>;
  updateCurrency(id: string, currency: string);
  updateItem(id: string, updateRequest: OrderItemUpdateRequest);
}
