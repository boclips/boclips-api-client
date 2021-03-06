import {
  OrderItemFactory,
  OrdersFactory,
} from '../../../test-support/OrdersFactory';
import { Clearable } from '../../common/utils/Clearable';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrdersPage } from '../model/OrdersPage';
import { OrderItem } from './../model/OrderItem';
import { OrdersClient } from './OrdersClient';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';
import { BoclipsApiError } from '../../../types';
import { PlaceOrderRequest } from '../model/PlaceOrderRequest';
import { CartItem } from '../../carts/model/CartItem';
import { DeepPartial } from '../../common/model/DeepPartial';

export class FakeOrdersClient implements OrdersClient, Clearable {
  private orders: Order[] = [];
  private placeOrderError?: BoclipsApiError | null;

  public insertOrderFixture(order: Partial<Order>) {
    this.orders.push(OrdersFactory.sample(order));
  }

  public get(id: string): Promise<Order | null> {
    return Promise.resolve(
      this.orders.find((order) => order.id === id) || null,
    );
  }

  public getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  public getUserOrders(page: number, size: number): Promise<OrdersPage> {
    return Promise.resolve({
      orders: this.orders,
      page: {
        number: page,
        size: size,
        totalElements: this.orders.length,
        totalPages: 1,
      },
    });
  }

  public async updateOrder(
    orderToUpdate: Order,
    updateRequest: OrderUpdateRequest,
  ): Promise<Order> {
    const order = await this.get(orderToUpdate.id);

    if (!order) {
      throw new Error(`Cannot update order: ${orderToUpdate.id}`);
    }

    return Promise.resolve({
      ...order,
      ...{
        totalPrice: {
          ...order.totalPrice,
          currency: updateRequest?.currency || order.totalPrice.currency,
        },
        status: updateRequest.status || order.status,
        userDetails: {
          ...order.userDetails,
          organisation:
            updateRequest?.organisation || order.userDetails.organisation,
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
        .map((order) => {
          const index = order.items.findIndex((it) => it.id === item.id);

          if (index < 0) {
            return null;
          }

          const itemToUpdate = order.items[index];

          if (request.price) {
            itemToUpdate.price = {
              currency: itemToUpdate.price?.currency,
              value: request.price,
              displayValue: `${itemToUpdate.price?.currency} ${request.price}`,
            };
          }
          if (request.license) {
            itemToUpdate.license = request.license;
          }

          return order;
        })
        .find((o) => o != null)!,
    );
  }

  public clear() {
    this.orders = [];
    this.placeOrderError = null;
  }

  public rejectNextPlaceOrder(apiError: BoclipsApiError) {
    this.placeOrderError = apiError;
  }

  placeOrder(request: PlaceOrderRequest): Promise<string> {
    if (this.placeOrderError) {
      const error = Promise.reject(this.placeOrderError);
      this.placeOrderError = null;
      return error;
    }

    const orderItems: OrderItem[] | undefined = request.cart?.items?.map(
      (item: DeepPartial<CartItem> | undefined) => {
        return OrderItemFactory.sample({
          id: item?.id,
          video: OrderItemFactory.sampleVideo({ id: item?.videoId }),
          captionsRequested: item?.additionalServices?.captionsRequested,
          editRequest: item?.additionalServices?.editRequest,
          trim:
            item?.additionalServices?.trim &&
            `${item.additionalServices?.trim?.from}-${item.additionalServices?.trim.to}`,
        });
      },
    );

    const order = OrdersFactory.sample({
      id: Date.now().toString(),
      items: orderItems,
      note: request.cart.note,
      userDetails: {
        requestingUser: `${request.user.firstName} ${request.user.lastName}`,
        authorisingUser: `${request.user.firstName} ${request.user.lastName}`,
        organisation: request.user.organisation.name,
      },
    });
    this.orders.push(order);
    return Promise.resolve(order.id);
  }
}
