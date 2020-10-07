import { Order } from '../model/Order';
import { OrderItem } from '../model/OrderItem';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';

export interface OrdersClient {
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  updateOrder(id: Order, updateRequest: OrderUpdateRequest): Promise<Order>;
  updateItem(
    item: OrderItem,
    updateRequest: OrderItemUpdateRequest,
  ): Promise<Order>;
}
