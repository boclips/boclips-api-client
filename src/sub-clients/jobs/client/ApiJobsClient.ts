import { AxiosResponse } from 'axios';
import { Link } from '../../../types';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageableConverter } from '../../common/model/PageableConverter';
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

    const manuallyCreated =
      filter && filter.manuallyCreated !== undefined
        ? filter.manuallyCreated.toString()
        : undefined;

    return this.axios
      .get(
        expandUrlTemplate(jobsLink.href, {
          page: pageRequest.page,
          size: pageRequest.size,
          manuallyCreated: manuallyCreated!,
        }),
      )
      .then(
        (response: AxiosResponse): Pageable<Job> => {
          return PageableConverter.convert(
            response.data,
            'jobs',
            this.convertJobResponse,
          );
        },
      );
  }

  public async get(id: string): Promise<Job> {
    const jobDetailsLinks = await this.getLinkOrThrow('jobDetails');

    if (!jobDetailsLinks) {
      throw Error('Not authorized to view an individual job');
    }

    const expandedLink = expandUrlTemplate(jobDetailsLinks.href, { id });

    try {
      const response: AxiosResponse = await this.axios.get(expandedLink);
      return this.convertJobResponse(response.data);
    } catch (e) {
      throw {
        error: e.error,
        message: e.message,
        path: expandedLink,
        status: e.status,
        timestamp: new Date(),
      };
    }
  }

  private convertJobResponse(response: any): Job {
    const {
      id,
      createdAt,
      provider,
      status,
      videoSummary,
      _links,
      videos,
    } = response;

    return {
      id,
      createdAt: new Date(createdAt),
      provider,
      status,
      videoSummary,
      videos,
      links: {
        self: new Link(_links.self),
        errorsMetadata:
          _links.errorsMetadata && new Link(_links.errorsMetadata),
      },
    };
  }
}
