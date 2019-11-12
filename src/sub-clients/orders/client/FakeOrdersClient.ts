import { OrderFactory } from '../../../test-support/OrderFactory';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrdersClient } from './OrdersClient';

export class FakeOrdersClient implements OrdersClient {
  private orders: Order[] = [];

  public insertOrderFixture(order: Partial<Order>) {
    this.orders.push(OrderFactory.sample(order));
  }

  public get(id: string): Promise<Order | null> {
    return Promise.resolve(this.orders.find(order => order.id === id));
  }
  public getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
  public updateCurrency(_: string, __: string) {
    throw new Error('Method not implemented.');
  }
  public updateItem(_: string, __: OrderItemUpdateRequest) {
    throw new Error('Method not implemented.');
  }
}
