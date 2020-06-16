import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import {
  invalidShareCode,
  validShareCode,
} from '../pact/ShareCodeInteractions';

describe('ShareCodesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.shareCodes.insertValidShareCode(
            'fd3a7795-f85b-4130-8596-6f8a4030cbb0',
            '0FK5',
          );
        }
      });

      it(`can evaluate invalid share code`, async () => {
        await provider.addInteraction(
          invalidShareCode('fd3a7795-f85b-4130-8596-6f8a4030cbb0', 'BADD'),
        );

        const response: boolean = await client.shareCodes.validate(
          'fd3a7795-f85b-4130-8596-6f8a4030cbb0',
          'BADD',
        );

        expect(response).toBeFalsy();
      });

      it(`can evaluate valid share code`, async () => {
        await provider.addInteraction(
          validShareCode('fd3a7795-f85b-4130-8596-6f8a4030cbb0', '0FK5'),
        );

        const response: boolean = await client.shareCodes.validate(
          'fd3a7795-f85b-4130-8596-6f8a4030cbb0',
          '0FK5',
        );

        expect(response).toBeTruthy();
      });
    },
  );
});
