import { Duration } from 'dayjs/plugin/duration';
import { AxiosResponse } from 'axios';
import dayjs from '../../dayjs/index';
import { Link } from '../common/model/LinkEntity';
import { Channel } from './model/Channel';
import { IngestDetails } from './model/IngestDetails';
import { ChannelResource } from './resources/ChannelResource';
import { IngestDetailsResource } from './resources/IngestDetailsResource';

export class ChannelsConverter {
  public static convertEmbeddedResources(response: AxiosResponse): Channel[] {
    return response.data._embedded.channels.map((resource: any) =>
      ChannelsConverter.convertResource(resource as ChannelResource),
    );
  }

  public static convertResponse(response: AxiosResponse): Channel {
    return ChannelsConverter.convertResource(response.data);
  }

  public static convertResource(resource: ChannelResource): Channel {
    const {
      id,
      name,
      currency,
      legalRestriction,
      _links,
      distributionMethods,
      description,
      awards,
      hubspotId,
      notes,
      contentCategories,
      language,
      contentTypes,
      oneLineDescription,
      marketingInformation,
      pedagogyInformation,
      deliveryFrequency,
      ingest,
      contractName,
      contractId,
    } = resource;

    return {
      id,
      name,
      currency,
      legalRestriction,
      distributionMethods,
      description,
      awards,
      hubspotId,
      notes,
      contentCategories,
      language,
      contentTypes,
      oneLineDescription,
      marketingInformation,
      pedagogyInformation,
      deliveryFrequency: deliveryFrequency
        ? this.convertDeliveryFrequency(deliveryFrequency)
        : undefined,
      ingest: ingest ? this.convertIngestDetailsResource(ingest) : undefined,
      contractId,
      contractName,
      links: {
        self: !!_links && !!_links.self ? new Link(_links.self) : undefined,
      },
    };
  }

  public static convertIngestDetailsResource(
    resource: IngestDetailsResource,
  ): IngestDetails {
    switch (resource.type) {
      case 'MANUAL':
      case 'CUSTOM':
        return { type: resource.type };
      case 'MRSS':
        return { type: resource.type, urls: resource.urls! };
      case 'YOUTUBE':
        return { type: resource.type, playlistIds: resource.playlistIds! };
      default:
        throw new Error(resource.type);
    }
  }

  public static convertDeliveryFrequency(iso8601String: string): Duration {
    return dayjs.duration(iso8601String);
  }
}
