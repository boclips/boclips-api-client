import { PageRequest } from '../../common/model/PageRequest';
import Pageable from '../../common/model/Pageable';
import { IngestVideo } from '../model/IngestVideo';

export interface IngestVideosClient {
  getAll(page: PageRequest): Promise<Pageable<IngestVideo>>;
}
