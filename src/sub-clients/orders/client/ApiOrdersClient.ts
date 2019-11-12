import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Order } from '../model/Order';
import { OrderConverter } from '../OrderConverter';
import { OrdersClient } from './OrdersClient';

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
        `${expandUrlTemplate(orderLink.href, { id })}?currency=${currency}`, // TODO this should be a HATEOS link on the order
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

  public updateItem(
    _: string,
    __: import('../model/OrderItemUpdateRequest').OrderItemUpdateRequest,
  ) {
    throw new Error('Method not implemented.');
  }
}
