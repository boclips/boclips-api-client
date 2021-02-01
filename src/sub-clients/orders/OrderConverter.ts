import { AxiosResponse } from 'axios';
import { Link } from '../../types';
import { Order, OrderStatus } from './model/Order';
import { OrderItem, OrderCaptionStatus } from './model/OrderItem';
export class OrderConverter {
  public static convertEmbeddedResource(response: AxiosResponse): Order[] {
    return response.data._embedded.orders.map(OrderConverter.convert);
  }

  public static convertResource(response: AxiosResponse): Order {
    return OrderConverter.convert(response.data);
  }

  private static convert(resource: any): Order {
    const {
      id,
      legacyOrderId,
      createdAt,
      updatedAt,
      _links,
      totalPrice,
      status,
      userDetails,
      isbnNumber,
      captionsRequested,
      items,
      deliveredAt,
      deliveryDate,
      note,
    } = resource;

    return {
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      deliveredAt: deliveredAt ? new Date(deliveredAt) : null,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      totalPrice,
      status: OrderStatus[status as keyof typeof OrderStatus],
      userDetails: {
        authorisingUser: userDetails.authorisingUserLabel,
        requestingUser: userDetails.requestingUserLabel,
        organisation: userDetails.organisationLabel,
      },
      note,
      legacyOrderId,
      isbnNumber,
      captionsRequested,
      links: {
        self: new Link(_links.self),
        update: new Link(_links.update),
      },
      items: OrderConverter.orderItemsConverter(items),
    };
  }
  private static orderItemsConverter(items: any): OrderItem[] {
    return items.map(
      (item: any): OrderItem => {
        const {
          id,
          channel,
          licenseDuration,
          licenseTerritory,
          price,
          captionsRequested,
          trim,
          video,
          _links,
        } = item;

        return {
          id,
          channel: channel,
          license: { duration: licenseDuration, territory: licenseTerritory },
          price,
          captionsRequested,
          trim,
          video: {
            ...video,
            captionStatus: OrderCaptionStatus[video.captionStatus],
            _links: {
              fullProjection: new Link(video._links.fullProjection),
              videoUpload: new Link(video._links.videoUpload),
              captionAdmin: new Link(video._links.captionAdmin),
            },
          },
          links: {
            updatePrice: new Link(_links.updatePrice),
            update: new Link(_links.update),
          },
        };
      },
    );
  }
}
