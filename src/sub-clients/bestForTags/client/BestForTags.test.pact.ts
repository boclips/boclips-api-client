import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getBestForTags } from '../pact/BestForTagsInteractions';

describe('BestForTagsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.bestForTagsClient.insertBestForTag({
            id: '1',
            label: 'label',
            userId: null,
          });
        }
      });

      it('can fetch all bestFor tags', async () => {
        await provider.addInteraction(getBestForTags);
        const response = await client.bestForTagsClient.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('1');
        expect(response[0].label).toEqual('label');
        expect(response[0].userId).toEqual(null);
      });
    },
  );
});
