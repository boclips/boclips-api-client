import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getEduAgeRangesInteraction } from '../pact/EduAgeRangesInteractions';

describe('EduAgeRangeClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          (client as FakeBoclipsClient).eduAgeRangesClient.insertEduAgeRangeFixture(
            {
              id: 'early-years',
              min: 3,
              max: undefined,
              label: '3 - 5 Early Years',
            },
          );
        }
      });

      it('can fetch all age ranges', async () => {
        await provider.addInteraction(getEduAgeRangesInteraction());
        const response = await client.eduAgeRangesClient.getAll();

        expect(response[0].id).toEqual('early-years');
        expect(response[0].min).toEqual(3);
        expect(response[0].max).toBeUndefined();
        expect(response[0].label).toEqual('3 - 5 Early Years');
      });
    },
  );
});
