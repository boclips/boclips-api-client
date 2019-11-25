import Pageable from '../../common/model/Pageable';
import { Job } from '../model/Job';
import { JobsFilterRequest } from '../model/JobsFilterRequest';
import { PageRequest } from './../../common/model/PageRequest';

export interface JobsClient {
  getAll(page: PageRequest, filter?: JobsFilterRequest): Promise<Pageable<Job>>;
  get(id: string): Promise<Job | null>;
}
