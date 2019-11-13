import { Order } from '../model/Order';
import { OrderItem } from '../model/OrderItem';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';

export interface OrdersClient {
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  updateCurrency(id: string, currency: string): Promise<Order>;
  updateItem(
    item: OrderItem,
    updateRequest: OrderItemUpdateRequest,
  ): Promise<Order>;
}
