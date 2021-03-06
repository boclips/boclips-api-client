import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrdersPage } from '../model/OrdersPage';
import { OrderConverter } from '../OrderConverter';
import { OrderItem } from './../model/OrderItem';
import { OrdersClient } from './OrdersClient';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';
import { PlaceOrderRequest } from '../model/PlaceOrderRequest';

export class ApiOrdersClient extends ApiSubClient implements OrdersClient {
  public placeOrder(request: PlaceOrderRequest): Promise<string> {
    const orderLink = this.getLinkOrThrow('placeOrder');
    return this.axios
      .post(
        orderLink.href,
        {
          items: request.cart.items,
          note: request.cart.note,
          user: {
            id: request.user.id,
            firstName: request.user.firstName,
            lastName: request.user.lastName,
            email: request.user.email,
            organisation: request.user.organisation,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((it) => {
        return it.headers.location;
      });
  }

  public get(id: string): Promise<Order> {
    const orderLink = this.getLinkOrThrow('order');
    return this.axios
      .get(expandUrlTemplate(orderLink.href, { id }))
      .then((response: AxiosResponse) => {
        return OrderConverter.convertResource(response);
      });
  }

  public getAll(): Promise<Array<import('../model/Order').Order>> {
    const ordersLink = this.getLinkOrThrow('orders');

    return this.axios.get(ordersLink.href).then((response: AxiosResponse) => {
      return OrderConverter.convertEmbeddedResource(response);
    });
  }

  public getUserOrders(page: number, size: number): Promise<OrdersPage> {
    const ordersLink = this.getLinkOrThrow('userOrders');

    return this.axios
      .get(expandUrlTemplate(ordersLink.href, { page, size }))
      .then((response: AxiosResponse) => {
        return {
          orders: OrderConverter.convertEmbeddedResource(response),
          page: response.data.page,
        };
      });
  }

  public updateOrder(
    order: Order,
    updateRequest: OrderUpdateRequest,
  ): Promise<Order> {
    const orderLink = order.links.update.getOriginalLink();

    if (!orderLink) {
      throw Error('Not allowed to update order');
    }

    return this.axios
      .patch(orderLink, updateRequest, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        return OrderConverter.convertResource(response);
      });
  }

  public updateItem(
    item: OrderItem,
    updateRequest: OrderItemUpdateRequest,
  ): Promise<Order> {
    return this.axios
      .patch(item.links.update.getOriginalLink(), updateRequest, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response: AxiosResponse) => {
        return OrderConverter.convertResource(response);
      });
  }
}
