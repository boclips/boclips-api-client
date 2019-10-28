import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { getLegalRestrictions } from '../pact/legalRestrictions';
import { provider } from '../../../test-support/pactSetup';
import {
  isATestClient,
  withClients,
} from '../../../test-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../FakeBoclipsClient';

describe('LegalRestrictionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.legalRestrictionsClient.insertLegalRestrictionsFixture({
            id: '2',
            text: 'No restrictions',
          });
        }
      });

      it('can fetch all legal restrictions', async () => {
        if (!isATestClient(client)) {
          await provider.addInteraction(getLegalRestrictions);
        }

        const response = await client.legalRestrictionsClient.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('2');
        expect(response[0].text).toEqual('No restrictions');
      });
    },
  );
});
