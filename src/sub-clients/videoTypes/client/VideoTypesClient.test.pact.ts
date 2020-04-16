import { getVideoTypes } from '../pact/VideoTypesInteractions';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';

describe('VideoTypesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.videoTypes.insertVideoTypesFixture({
            types: ['type'],
          });
        }
      });

      it('can fetch all video types', async () => {
        await provider.addInteraction(getVideoTypes);
        const response = await client.videoTypes.getAll();

        expect(response.types).toHaveLength(1);
        expect(response.types[0]).toEqual('type');
      });
    },
  );
});
