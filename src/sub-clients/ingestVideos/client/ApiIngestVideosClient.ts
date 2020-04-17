import { PageableConverter } from '../../common/model/PageableConverter';
import { PageRequest } from '../../common/model/PageRequest';
import {
  IngestVideosClient,
  IngestVideosFilterRequest,
} from './IngestVideosClient';
import Pageable from '../../common/model/Pageable';
import { IngestVideo } from '../model/IngestVideo';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { isNotEmpty } from './isNotEmpty';

export class ApiIngestVideosClient extends ApiSubClient
  implements IngestVideosClient {
  public async getAll(
    pageRequest: PageRequest,
    filterRequest?: IngestVideosFilterRequest,
  ): Promise<Pageable<IngestVideo>> {
    const ingestVideosLink = await this.getLinkOrThrow('ingestVideos');

    if (!ingestVideosLink) {
      throw Error('Not authorized to view ingest videos');
    }

    const interpolationParams = {
      page: pageRequest.page,
      size: pageRequest.size,
    };

    if (filterRequest && isNotEmpty(filterRequest.contentPartnerName)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      interpolationParams['content_partner'] = filterRequest.contentPartnerName;
    }

    if (filterRequest && filterRequest.statuses) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      interpolationParams['status'] = filterRequest.statuses;
    }

    return this.axios
      .get(expandUrlTemplate(ingestVideosLink.href, interpolationParams))
      .then(
        (response: AxiosResponse): Pageable<IngestVideo> => {
          return PageableConverter.convert(
            response.data,
            'ingestVideos',
            (response: any): IngestVideo => {
              return {
                id: response.id,
                title: response.title,
                ingestJob: { id: response.ingestJob.id },
                contentPartner: {
                  id: response.contentPartner.id,
                  name: response.contentPartner.name,
                },
                status: response.status,
                ingestStartedAt: new Date(response.ingestStartedAt),
              };
            },
          );
        },
      );
  }
}
