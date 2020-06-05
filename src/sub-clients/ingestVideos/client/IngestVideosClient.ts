import { PageRequest } from '../../common/model/PageRequest';
import Pageable from '../../common/model/Pageable';
import { IngestVideo } from '../model/IngestVideo';

export interface IngestVideosFilterRequest {
  channelName?: string;
  statuses?: string[];
}

export interface IngestVideosClient {
  getAll(
    page: PageRequest,
    filterRequest?: IngestVideosFilterRequest,
  ): Promise<Pageable<IngestVideo>>;
}
