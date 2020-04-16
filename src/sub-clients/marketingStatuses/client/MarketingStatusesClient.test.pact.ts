import { ApiBoclipsClient } from '../../../index';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getMarketingStatusesInteraction } from '../pact/MarketingStatusesInteractions';

describe('MarketingStatusesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.marketingStatuses.setMarketingStatuses([
            'Fake Status 1',
            'Fake Status 2',
          ]);
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getMarketingStatusesInteraction());
        const response = await client.marketingStatuses.getAll();

        expect(response).not.toEqual([]);
        response.map(it => expect(typeof it).toEqual('string'));
      });
    },
  );
});
