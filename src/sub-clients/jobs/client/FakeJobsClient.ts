import { BoclipsApiError } from './../../../types/BoclipsApiError';
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

  public insertJobFixture(job: Job, manual: boolean | null = null) {
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
      page: this.filterJobs(filter!),
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
    if (filter.manuallyCreated === undefined) return this.jobs;
    if (filter.manuallyCreated) {
      return this.manualJobs;
    } else if (!filter.manuallyCreated) {
      return this.automaticJobs;
    } else {
      throw new Error('???');
    }
  }

  public clear() {
    this.jobs = [];
    this.manualJobs = [];
    this.automaticJobs = [];
  }

  public get(id: string): Promise<Job> {
    const retrievedJob = this.jobs.find(job => job.id === id);

    if (retrievedJob != undefined) {
      return Promise.resolve(retrievedJob);
    } else {
      const boError: BoclipsApiError = {
        message: `No job with id: ${id}`,
        status: 404,
        error: 'Cannot find job',
        path: `/v1/jobs/${id}`,
        timestamp: new Date(),
      };

      return Promise.reject(boError);
    }
  }
}
