import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getLegalRestrictions } from '../pact/LegalRestrictionsInteractions';

describe('LegalRestrictionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.legalRestrictions.insertLegalRestrictionsFixture({
            id: '2',
            text: 'No restrictions',
          });
        }
      });

      it('can fetch all legal restrictions', async () => {
        await provider.addInteraction(getLegalRestrictions);
        const response = await client!.legalRestrictions.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('2');
        expect(response[0].text).toEqual('No restrictions');
      });
    },
  );
});
