import { Link } from '../../../types';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { Job } from '../model/Job';
import { JobsFilterRequest } from '../model/JobsFilterRequest';
import { Clearable } from './../../common/utils/Clearable';
import { JobsClient } from './JobsClient';

export class FakeJobsClient implements JobsClient, Clearable {
  private jobs: Job[] = [];
  private manualJobs: Job[] = [];
  private automaticJobs: Job[] = [];

  public insertJobFixture(job: Job, manual: boolean = null) {
    this.jobs.push(job);
    if (manual === true) {
      this.manualJobs.push(job);
    } else {
      this.automaticJobs.push(job);
    }
  }

  public getAll(
    page: PageRequest,
    filter?: JobsFilterRequest,
  ): Promise<Pageable<Job>> {
    return Promise.resolve({
      page: this.filterJobs(filter),
      pageSpec: {
        number: page.page,
        size: page.size,
        totalElements: this.jobs.length,
        totalPages: Math.floor(this.jobs.length / page.size),
        nextPage: new Link({
          href: `/v1/jobs?size=${page.size}&page=${page.page + 1}`,
        }),
        previousPage: new Link({
          href: `/v1/jobs?size=${page.size}&page=${page.page - 1}`,
        }),
      },
    });
  }

  private filterJobs(filter: JobsFilterRequest): Job[] {
    if (!filter) return this.jobs;
    if (!filter.manuallyCreated) return this.jobs;
    if (filter.manuallyCreated == true) {
      return this.manualJobs;
    } else if (filter.manuallyCreated == false) {
      return this.automaticJobs;
    }
  }

  public clear() {
    this.jobs = [];
  }

  public get(id: string): Promise<Job> {
    return Promise.resolve(this.jobs.find(job => job.id === id));
  }
}
