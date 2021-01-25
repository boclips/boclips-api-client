import { OrderItemVideoLinks } from './../sub-clients/orders/model/OrderItem';
import { Order, OrderStatus } from '../sub-clients/orders/model/Order';
import {
  OrderItem,
  OrderCaptionStatus,
  OrderItemVideo,
} from '../sub-clients/orders/model/OrderItem';
import { OrderPrice } from '../sub-clients/orders/model/OrderPrice';
import { Link } from '../types';

export class OrdersFactory {
  public static sample(order: Partial<Order>): Order {
    return {
      ...{
        id: '123',
        captionsRequested: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryDate: new Date(),
        isbnNumber: '123',
        note: 'i am a note',
        legacyOrderId: 'legacy-order-id',
        status: OrderStatus.READY,
        totalPrice: OrderPriceFactory.sample(),
        userDetails: {
          authorisingUser: 'a user <A User@gmail.com>',
          requestingUser: 'a requstor <arequestor@gmail.com',
          organisation: 'The Org',
        },
        links: {
          self: new Link({ href: 'v1/orders/123' }),
          update: new Link({ href: '/v1/orders' }),
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
        video: OrderItemFactory.sampleVideo(),
        channel: {
          id: 'contentPartner-123',
          name: 'contentPartner-name',
        },
        price: OrderPriceFactory.sample(),
        trim: undefined,
        license: { duration: 'A long time', territory: 'Wrexham' },
        captionsRequested: false,
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

  public static sampleVideo(
    video: Partial<OrderItemVideo> = {},
  ): OrderItemVideo {
    return {
      id: '123',
      types: ['NEWS'],
      title: 'The video title',
      videoReference: 'The video reference',
      maxResolutionAvailable: false,
      captionStatus: OrderCaptionStatus.AVAILABLE,
      _links: OrderItemFactory.sampleVideoLinks(video._links),
      ...video,
    };
  }

  public static sampleVideoLinks(
    links: Partial<OrderItemVideoLinks> = {},
  ): OrderItemVideoLinks {
    return {
      fullProjection: new Link({
        href: '/v1/videos/123?projection=full',
      }),
      videoUpload: new Link({
        href: '/v1/videos/123?projection=full',
      }),
      captionAdmin: new Link({
        href: '/v1/videos/123?projection=full',
      }),
      ...links,
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
