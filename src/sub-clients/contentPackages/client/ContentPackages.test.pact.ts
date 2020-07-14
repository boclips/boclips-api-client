import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getContentPackages } from '../pact/GetContentPackages';

describe('ContentPackagesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPackages.insert({
            id: '2',
            name: 'My content package',
          });
        }
      });

      it('can fetch all content packages', async () => {
        await provider.addInteraction(getContentPackages);
        const response = await client?.contentPackages.getAll();

        expect(response).toHaveLength(1);
        expect(response?.[0].id).toEqual('2');
        expect(response?.[0].name).toEqual('My content package');
      });
    },
  );
});
