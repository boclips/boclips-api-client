import { PageRequest } from '../../common/model/PageRequest';
import Pageable from '../../common/model/Pageable';
import { IngestVideos } from '../model/IngestVideos';

export interface IngestVideosClient {
  getAll(page: PageRequest): Promise<Pageable<IngestVideos>>;
}
