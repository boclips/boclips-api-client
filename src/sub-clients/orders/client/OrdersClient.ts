import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';

export interface OrdersClient {
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  updateCurrency(id: string, currency: string): Promise<Order>;
  updateItem(id: string, updateRequest: OrderItemUpdateRequest);
}
