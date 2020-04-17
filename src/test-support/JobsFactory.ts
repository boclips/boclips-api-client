import { Job } from '../sub-clients/jobs/model/Job';
import { JobStatus } from '../sub-clients/jobs/model/JobStatus';
import { Link } from '../types';

export class JobsFactory {
  public static sample(job: Partial<Job>): Job {
    return {
      id: 'THE-ID',
      status: JobStatus.DUPLICATE,
      provider: 'TeD',
      createdAt: new Date(),
      videoSummary: {
        totalErroredVideos: 0,
        totalVideos: 1,
        totalIgnoredVideos: 0,
        totalErrors: 1,
        totalSuccessfulVideos: 1,
      },
      videos: [],
      errors: undefined,
      links: {
        self: new Link({ href: 'v1/jobs/the-id', templated: false }),
      },
      ...job,
    };
  }
}
