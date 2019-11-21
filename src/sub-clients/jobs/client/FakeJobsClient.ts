import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { Job } from '../model/Job';
import { JobsFilterRequest } from '../model/JobsFilterRequest';
import { JobsClient } from './JobsClient';

export class FakeJobsClient implements JobsClient {
  public getAll(
    page: PageRequest,
    filter?: JobsFilterRequest,
  ): Promise<Pageable<Job>> {
    console.log(page, filter);

    throw new Error('Method not implemented.');
  }
}
