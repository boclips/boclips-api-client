import { PageableConverter } from './../../common/model/PageableConverter';
import { PageRequest } from './../../common/model/PageRequest';
import { IngestVideosClient } from './IngestVideosClient';
import Pageable from '../../common/model/Pageable';
import { IngestVideo } from '../model/IngestVideo';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { AxiosResponse } from 'axios';
import { ApiSubClient } from '../../common/client/ApiSubClient';

export class ApiIngestVideosClient extends ApiSubClient
  implements IngestVideosClient {
  public async getAll(
    pageRequest: PageRequest,
  ): Promise<Pageable<IngestVideo>> {
    const ingestVideosLink = await this.getLinkOrThrow('ingestVideos');

    if (!ingestVideosLink) {
      throw Error('Not authorized to view ingest videos');
    }

    return this.axios
      .get(
        expandUrlTemplate(ingestVideosLink.href, {
          page: pageRequest.page,
          size: pageRequest.size,
        }),
      )
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
