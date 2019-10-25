import { HttpBoclipsApiClient } from '../../HttpBoclipsApiClient';
import { getLegalRestrictions } from '../../test-support/interactions/legalRestrictions';
import { provider } from '../../test-support/pactSetup';
import { isATestClient, withClients } from '../../test-support/pactTestWrapper';
import { TestBoclipsApiClient } from '../../TestBoclipsApiClient';

describe('LegalRestrictionsController', () => {
  withClients(
    (getClient: () => Promise<TestBoclipsApiClient | HttpBoclipsApiClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.legalRestrictionsController.insertLegalRestrictionsFixture({
            id: '2',
            text: 'No restrictions',
          });
        }
      });

      it('can fetch all legal restrictions', async () => {
        if (!isATestClient(client)) {
          await provider.addInteraction(getLegalRestrictions);
        }

        const response = await client.legalRestrictionsController.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual('2');
        expect(response[0].text).toEqual('No restrictions');
      });
    },
  );
});
