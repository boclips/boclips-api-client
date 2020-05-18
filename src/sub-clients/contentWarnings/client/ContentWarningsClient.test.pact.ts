import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getContentWarnings } from '../pact/ContentWarningsInteraction';

describe('ContentWarningsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentWarnings.insert({
            id: '2',
            label: 'Disclaimer: this is a warning',
          });
        }
      });

      it('can fetch all content warnings', async () => {
        await provider.addInteraction(getContentWarnings);
        const response = await client?.contentWarnings.getAll();

        expect(response).toHaveLength(1);
        expect(response?.[0].id).toEqual('2');
        expect(response?.[0].label).toEqual('Disclaimer: this is a warning');
      });
    },
  );
});
