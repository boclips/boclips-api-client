import { AxiosResponse } from 'axios';
import { Link } from '../../../types';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Job } from '../model/Job';
import { JobsFilterRequest } from '../model/JobsFilterRequest';
import { JobsClient } from './JobsClient';

export class ApiJobsClient extends ApiSubClient implements JobsClient {
  public async getAll(
    pageRequest: PageRequest,
    filter?: JobsFilterRequest,
  ): Promise<Pageable<Job>> {
    const jobsLink = await this.getLinkOrThrow('jobs');

    if (!jobsLink) {
      throw Error('Not authorized to view jobs');
    }

    return this.axios
      .get(
        expandUrlTemplate(jobsLink.href, {
          page: pageRequest.page,
          size: pageRequest.size,
          status: filter === undefined ? undefined : filter.statuses,
        }),
      )
      .then((response: AxiosResponse) => ({
        page: response.data._embedded.jobs.map(jobs =>
          this.convertJobResponse(jobs),
        ),
        pageSpec: response.data.page,
      }));
  }

  private convertJobResponse(response: any): Job {
    const { id, createdAt, provider, status, videoSummary, _links } = response;

    return {
      id,
      createdAt: new Date(createdAt),
      provider,
      status,
      videoSummary,
      links: {
        self: new Link(_links.self),
        errorsMetadata: _links.errorsMetadata && new Link(_links.self),
      },
    };
  }
}
