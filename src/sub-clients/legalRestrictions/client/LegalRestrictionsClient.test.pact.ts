import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support/FakeBoclipsClient';
import { getLegalRestrictions } from '../pact/LegalRestrictionsInteractions';
import { WithClientsOptions } from './../../../pact-support/pactTestWrapper';

describe('LegalRestrictionsClient', () => {
  withClients(
    (
      getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>,
      options: WithClientsOptions,
    ) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (!options.isRealClient) {
          client.legalRestrictionsClient.insertLegalRestrictionsFixture({
            id: '2',
            text: 'No restrictions',
          });
        }
      });

      it('can fetch all legal restrictions', async () => {
        await provider.addInteraction(getLegalRestrictions);
        const response = await client.legalRestrictionsClient.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('2');
        expect(response[0].text).toEqual('No restrictions');
      });
    },
  );
});
