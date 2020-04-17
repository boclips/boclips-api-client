import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getBestForTags } from '../pact/BestForTagsInteractions';

describe('BestForTagsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.bestForTags.insertBestForTag({
            id: '1',
            label: 'label',
          });
        }
      });

      it('can fetch all bestFor tags', async () => {
        await provider.addInteraction(getBestForTags);
        const response = await client!.bestForTags.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('1');
        expect(response[0].label).toEqual('label');
      });

      it('does not return the userId property', async () => {
        await provider.addInteraction(getBestForTags);
        const response = await client!.bestForTags.getAll();

        expect(response[0]).not.toHaveProperty('userId');
      });
    },
  );
});
