import { provider } from '../../../pact-support/pactSetup';
import { FakeBoclipsClient } from '../../../test-support';
import { JobsFactory } from '../../../test-support/JobsFactory';
import { Link } from '../../../types';
import { JobStatus } from '../model/JobStatus';
import { ApiBoclipsClient } from './../../../ApiBoclipsClient';
import { withClients } from './../../../pact-support/pactTestWrapper';
import { isATestClient } from './../../../test-support/index';
import {
  exisitingJobIdFromStaging,
  getFilteredJobsInteraction,
  getJobInteraction,
  getJobsInteraction,
} from './../pact/JobsInteraction';

describe('JobsCleint', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.jobsClient.insertJobFixture(
            JobsFactory.sample({
              id: exisitingJobIdFromStaging,
              createdAt: new Date('2019-11-21T17:00:00.908'),
              provider: 'Getty',
              status: JobStatus.INGESTING,
              videoSummary: {
                totalErrors: 1,
                totalErroredVideos: 1,
                totalSuccessfulVideos: 1,
                totalIgnoredVideos: 0,
                totalVideos: 1,
              },
              videos: [
                {
                  id: 'a video id',
                  title: 'Why did the banana cross the road?',
                  status: JobStatus.SUCCESS,
                  errors: [],
                },
              ],
              links: {
                self: new Link({
                  href: `v1/jobs/${exisitingJobIdFromStaging}`,
                  templated: false,
                }),
              },
            }),
          );
        }
      });

      it('can fetch all jobs', async () => {
        await provider.addInteraction(getJobsInteraction());

        const jobs = await client.jobsClient.getAll({ page: 1, size: 5 });
        const pageSpec = jobs.pageSpec;
        const firstJob = jobs.page[0];

        expect(pageSpec.size).toEqual(5);
        expect(pageSpec.number).toEqual(1);
        expect(pageSpec.nextPage.getOriginalLink()).toBeDefined();
        expect(pageSpec.previousPage.getOriginalLink()).toBeDefined();

        expect(firstJob.id).toEqual(exisitingJobIdFromStaging);
        expect(firstJob.createdAt).toEqual(new Date('2019-11-21T17:00:00.908'));
        expect(firstJob.provider).toEqual('Getty');
        expect(firstJob.status).toEqual('INGESTING');
        expect(firstJob.videoSummary.totalErroredVideos).toEqual(1);
        expect(firstJob.videoSummary.totalErrors).toEqual(1);
        expect(firstJob.videoSummary.totalSuccessfulVideos).toEqual(1);
        expect(firstJob.videoSummary.totalIgnoredVideos).toEqual(0);
        expect(firstJob.links.self.getOriginalLink()).toEqual(
          `v1/jobs/${exisitingJobIdFromStaging}`,
        );
      });

      it('can fetch all jobs filtering by status', async () => {
        await provider.addInteraction(
          getFilteredJobsInteraction({ statuses: [JobStatus.ERROR] }),
        );

        if (isATestClient(client)) {
          client.jobsClient.insertJobFixture(
            JobsFactory.sample({ status: JobStatus.ERROR }),
          );
        }

        const jobs = await client.jobsClient.getAll(
          { page: 1, size: 5 },
          { statuses: [JobStatus.ERROR] },
        );

        const firstJob = jobs.page[0];
        expect(firstJob.status).toEqual('ERROR');
      });

      it('can fetch a job', async () => {
        await provider.addInteraction(
          getJobInteraction(exisitingJobIdFromStaging),
        );

        const job = await client.jobsClient.get(exisitingJobIdFromStaging);
        expect(job.id).toEqual(exisitingJobIdFromStaging);
        expect(job.createdAt).toEqual(new Date('2019-11-21T17:00:00.908'));
        expect(job.provider).toEqual('Getty');
        expect(job.status).toEqual('INGESTING');
        expect(job.videoSummary.totalErroredVideos).toEqual(1);
        expect(job.videoSummary.totalErrors).toEqual(1);
        expect(job.videoSummary.totalSuccessfulVideos).toEqual(1);
        expect(job.videoSummary.totalIgnoredVideos).toEqual(0);
        expect(job.videos).toHaveLength(1);

        const firstVideo = job.videos[0];

        expect(firstVideo.id).toEqual('a video id');
        expect(firstVideo.title).toEqual('Why did the banana cross the road?');
        expect(firstVideo.status).toEqual(JobStatus.SUCCESS);

        expect(job.links.self.getOriginalLink()).toEqual(
          `v1/jobs/${exisitingJobIdFromStaging}`,
        );
      });
    },
  );
});
