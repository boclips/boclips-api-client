import { Order } from '../model/Order';
import { OrderItem } from '../model/OrderItem';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrdersPage } from '../model/OrdersPage';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';
import { User } from '../../organisations/model/User';
import { OrderItemRequest } from '../model/OrderItemRequest';

export interface OrdersClient {
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  getUserOrders(page?: number, size?: number): Promise<OrdersPage>;
  updateOrder(id: Order, updateRequest: OrderUpdateRequest): Promise<Order>;
  updateItem(
    item: OrderItem,
    updateRequest: OrderItemUpdateRequest,
  ): Promise<Order>;
  placeOrder(cartItems: OrderItemRequest[], user: User): Promise<string>;
}
