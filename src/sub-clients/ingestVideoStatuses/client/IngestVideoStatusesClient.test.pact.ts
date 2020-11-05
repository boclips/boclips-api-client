import { getIngestVideoStatusesInteraction } from './../pact/IngestVideoStatusesInteractions';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { ApiBoclipsClient } from '../../..';
import { provider } from '../../../pact-support/pactSetup';

describe('MarketingStatusesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.ingestVideoStatuses.insertFixture('Fake Status 1');
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getIngestVideoStatusesInteraction());
        const response = await client.ingestVideoStatuses.getAll();

        expect(response).not.toEqual([]);
        response.map((it) => expect(typeof it).toEqual('string'));
      });
    },
  );
});
