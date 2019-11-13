import { AxiosResponse } from 'axios';
import { Link } from '../../types';
import { Order } from './model/Order';
import { OrderItem } from './model/OrderItem';
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
      throughPlatform,
      transcriptRequested,
      items,
    } = resource;

    return {
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      totalPrice,
      status,
      userDetails: {
        authorisingUser: userDetails.authorisingUserLabel,
        requestingUser: userDetails.requestingUserLabel,
        organisation: userDetails.organisationLabel,
      },
      legacyOrderId,
      isbnNumber,
      throughPlatform,
      transcriptRequested,
      links: {
        self: new Link(_links.self),
      },
      items: OrderConverter.orderItemsConverter(items),
    };
  }
  private static orderItemsConverter(items: any): OrderItem[] {
    return items.map(item => {
      const {
        id,
        contentPartner,
        licenseDuration,
        licenseTerritory,
        price,
        transcriptRequested,
        video,
        _links,
      } = item;

      return {
        id,
        contentPartner,
        license: { duration: licenseDuration, territory: licenseTerritory },
        price,
        transcriptRequested,
        video,
        links: {
          updatePrice: new Link(_links.updatePrice),
          update: new Link(_links.update),
        },
      } as OrderItem;
    });
  }
}
