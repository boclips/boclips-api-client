import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Order } from '../model/Order';
import { OrderItemUpdateRequest } from '../model/OrderItemUpdateRequest';
import { OrderConverter } from '../OrderConverter';
import { OrderItem } from './../model/OrderItem';
import { OrdersClient } from './OrdersClient';
import {OrderUpdateRequest} from "../model/OrderUpdateRequest";

export class ApiOrdersClient extends ApiSubClient implements OrdersClient {
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
  public updateCurrency(id: string, currency: string): Promise<Order> {
    const orderLink = this.getLinkOrThrow('order');

    return this.axios
      .patch(
        `${expandUrlTemplate(orderLink.href, { id })}?currency=${currency}`, // TODO this should be a HATEOAS link on the order
        null,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((response: AxiosResponse) => {
        return OrderConverter.convertResource(response);
      });
  }

  public updateOrganisation(id: string, updateRequest: OrderUpdateRequest): Promise<Order> {
    const orderLink = this.getLinkOrThrow('order');

    return this.axios
      .patch(
        `${expandUrlTemplate(orderLink.href, { id })}`, // TODO this should be a HATEOAS link on the order
          updateRequest,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )
      .then((response: AxiosResponse) => {
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
