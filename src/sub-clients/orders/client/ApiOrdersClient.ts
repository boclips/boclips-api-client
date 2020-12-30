import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrderConverter } from '../OrderConverter';
import { OrderItem } from './../model/OrderItem';
import { OrdersClient } from './OrdersClient';
import { OrderUpdateRequest } from '../model/OrderUpdateRequest';
import { User } from '../../organisations/model/User';
import { OrderItemRequest } from '../model/OrderItemRequest';

export class ApiOrdersClient extends ApiSubClient implements OrdersClient {
  public placeOrder(
    cartItems: OrderItemRequest[],
    user: User,
  ): Promise<string> {
    const orderLink = this.getLinkOrThrow('placeOrder');
    return this.axios
      .post(
        orderLink.href,
        {
          items: cartItems,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            organisation: user.organisation,
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

  public getAll(
    page: number,
    size: number,
  ): Promise<Array<import('../model/Order').Order>> {
    const ordersLink = this.getLinkOrThrow('orders');

    return this.axios
      .get(expandUrlTemplate(ordersLink.href, { page, size }))
      .then((response: AxiosResponse) => {
        return OrderConverter.convertEmbeddedResource(response);
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
