import { provider } from '../../../pact-support/pactSetup';
import { FakeBoclipsClient } from '../../../test-support';
import { Link } from '../../../types';
import { JobStatus } from '../model/JobStatus';
import { ApiBoclipsClient } from './../../../ApiBoclipsClient';
import { withClients } from './../../../pact-support/pactTestWrapper';
import { isATestClient } from './../../../test-support/index';
import { JobFactory } from './../../../test-support/JobFactory';
import { getJobsInteraction } from './../pact/JobsInteraction';

describe('JobsCleint', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.jobsClient.insertJobFixture(
            JobFactory.sample({
              id: 'THE_JOB_ID',
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
              links: {
                self: new Link({
                  href: 'v1/jobs/THE_JOB_ID',
                  templated: false,
                }),
              },
            }),
          );
        }
      });

      it('can fetch all jobs', async () => {
        await provider.addInteraction(getJobsInteraction());

        const jobs = await client.jobsClient.getAll({ page: 0, size: 5 });
        const pageSpec = jobs.pageSpec;
        const firstJob = jobs.page[0];

        expect(pageSpec.size).toEqual(5);
        expect(pageSpec.number).toEqual(0);

        expect(firstJob.id).toEqual('THE_JOB_ID');
        expect(firstJob.createdAt).toEqual(new Date('2019-11-21T17:00:00.908'));
        expect(firstJob.provider).toEqual('Getty');
        expect(firstJob.status).toEqual('INGESTING');
        expect(firstJob.videoSummary.totalErroredVideos).toEqual(1);
        expect(firstJob.videoSummary.totalErrors).toEqual(1);
        expect(firstJob.videoSummary.totalSuccessfulVideos).toEqual(1);
        expect(firstJob.videoSummary.totalIgnoredVideos).toEqual(0);
        expect(firstJob.links.self.getOriginalLink()).toEqual(
          'v1/jobs/THE_JOB_ID',
        );
      });
    },
  );
});
