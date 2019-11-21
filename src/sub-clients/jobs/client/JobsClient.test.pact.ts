import { provider } from '../../../pact-support/pactSetup';
import { FakeBoclipsClient } from '../../../test-support';
import { ApiBoclipsClient } from './../../../ApiBoclipsClient';
import { withClients } from './../../../pact-support/pactTestWrapper';
import { getJobsInteraction } from './../pact/JobsInteraction';

describe('JobsCleint', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();
      });

      it('can fetch all jobs', async () => {
        await provider.addInteraction(getJobsInteraction());

        const jobs = await client.jobsClient.getAll({ page: 0, size: 1 });
        const pageSpec = jobs.pageSpec;
        const firstJob = jobs.page[0];

        expect(pageSpec.size).toEqual(1);
        expect(pageSpec.number).toEqual(0);

        expect(firstJob.id).toEqual('THE_JOB_ID');
        expect(firstJob.createdAt).toEqual(new Date('2019-11-21T17:00:00.908'));
        expect(firstJob.provider).toEqual('Getty');
        expect(firstJob.status).toEqual('INGESTING');

        // TODO more assertions?
      });
    },
  );
});
