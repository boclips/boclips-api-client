import { Order } from '../sub-clients/orders/model/Order';
import { OrderItem } from '../sub-clients/orders/model/OrderItem';
import { OrderPrice } from '../sub-clients/orders/model/OrderPrice';
import { Link } from '../types';

export class OrdersFactory {
  public static sample(order: Partial<Order>): Order {
    return {
      ...{
        id: '123',
        transcriptRequested: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        isbnNumber: '123',
        legacyOrderId: 'legacy-order-id',
        status: 'COMPLETED',
        throughPlatform: true,
        totalPrice: OrderPriceFactory.sample(),
        userDetails: {
          authorisingUser: 'a user <A User@gmail.com>',
          requestingUser: 'a requstor <arequestor@gmail.com',
          organisation: 'The Org',
        },
        links: {
          self: new Link({ href: 'v1/orders/123' }),
        },
        items: [],
      },
      ...order,
    };
  }
}

export class OrderItemFactory {
  public static sample(item: Partial<OrderItem>): OrderItem {
    return {
      ...{
        id: 'order-id',
        video: {
          id: '123',
          type: 'NEWS',
          title: 'The video title',
          videoReference: 'The video reference',
          _links: {
            fullProjection: new Link({
              href: '/v1/videos/123?projection=full',
            }),
          },
        },
        contentPartner: {
          id: 'contentPartner-123',
          name: 'contentPartner-name',
        },
        price: OrderPriceFactory.sample(),
        trim: undefined,
        license: { duration: 'A long time', territory: 'Wrexham' },
        transcriptRequested: false,
        links: {
          updatePrice: new Link({
            href: '/v1/orders/123/items/321?price={price}',
          }),
          update: new Link({
            href: '/v1/orders/123/items/321',
          }),
        },
      },
      ...item,
    };
  }
}

class OrderPriceFactory {
  public static sample(price: Partial<OrderPrice> = {}): OrderPrice {
    return {
      ...{
        currency: 'EUR',
        value: 123,
        displayValue: 'EUR 123',
      },
      ...price,
    };
  }
}
