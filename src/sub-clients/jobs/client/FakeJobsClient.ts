import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { Job } from '../model/Job';
import { JobsFilterRequest } from '../model/JobsFilterRequest';
import { Clearable } from './../../common/utils/Clearable';
import { JobsClient } from './JobsClient';

export class FakeJobsClient implements JobsClient, Clearable {
  private jobs: Job[] = [];

  public insertJobFixture(job: Job) {
    this.jobs.push(job);
  }
  public getAll(
    page: PageRequest,
    _?: JobsFilterRequest,
  ): Promise<Pageable<Job>> {
    return Promise.resolve({
      page: this.jobs,
      pageSpec: {
        number: page.page,
        size: page.size,
        totalElements: 0,
        totalPages: 0,
      },
    });
  }
  public clear() {
    this.jobs = [];
  }
}
