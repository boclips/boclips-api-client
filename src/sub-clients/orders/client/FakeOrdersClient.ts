import { OrdersFactory } from '../../../test-support/OrdersFactory';
import { Clearable } from '../../common/utils/Clearable';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrderItem } from './../model/OrderItem';
import { OrdersClient } from './OrdersClient';

export class FakeOrdersClient implements OrdersClient, Clearable {
  private orders: Order[] = [];

  public insertOrderFixture(order: Partial<Order>) {
    this.orders.push(OrdersFactory.sample(order));
  }

  public get(id: string): Promise<Order | null> {
    return Promise.resolve(this.orders.find(order => order.id === id));
  }
  public getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
  public async updateCurrency(id: string, currency: string): Promise<Order> {
    const order = await this.get(id);

    if (!order) {
      throw new Error(`Cannot update order: ${id}`);
    }
    return Promise.resolve({
      ...order,
      ...{
        totalPrice: {
          ...order.totalPrice,
          currency,
        },
      },
    });
  }
  public updateItem(
    item: OrderItem,
    request: OrderItemUpdateRequest,
  ): Promise<Order> {
    return Promise.resolve(
      this.orders
        .map(order => {
          const index = order.items.findIndex(it => it.id === item.id);

          if (index < 0) {
            return null;
          }

          const itemToUpdate = order.items[index];

          if (request.price) {
            itemToUpdate.price = {
              currency: itemToUpdate.price.currency,
              value: request.price,
              displayValue: `${itemToUpdate.price.currency} ${request.price}`,
            };

            if (request.license) {
              itemToUpdate.license = request.license;
            }
          }

          return order;
        })
        .find(o => o != null),
    );
  }

  public clear() {
    this.orders = [];
  }
}