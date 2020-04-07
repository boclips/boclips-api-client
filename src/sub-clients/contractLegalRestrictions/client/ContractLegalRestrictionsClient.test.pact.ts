import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getContractLegalRestrictions } from '../pact/ContractLegalRestrictionsInteraction';

describe('ContractLegalRestrictionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contractLegalRestrictions.insertLegalRestrictionsFixture({
            id: '2',
            text: 'No restrictions',
          });
        }
      });

      it('can fetch all legal restrictions', async () => {
        await provider.addInteraction(getContractLegalRestrictions);
        const response = await client.contractLegalRestrictions.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('2');
        expect(response[0].text).toEqual('No restrictions');
      });
    },
  );
});
