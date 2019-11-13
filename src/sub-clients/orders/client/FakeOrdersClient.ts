import { OrderFactory } from '../../../test-support/OrderFactory';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrderItem } from './../model/OrderItem';
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
  public updateCurrency(id: string, currency: string): Promise<Order> {
    return this.get(id).then(order => {
      return {
        ...order,
        ...{
          totalPrice: {
            ...order.totalPrice,
            currency,
          },
        },
      };
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
}
