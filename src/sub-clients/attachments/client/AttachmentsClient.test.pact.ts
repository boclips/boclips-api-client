import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { getAttachmentTypes } from '../pact/AttachmentInteractions';

describe('AttachmentsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.attachments.insertAttachmentType({
            name: 'TYPE',
            label: 'My attachment type',
          });
        }
      });

      it('can fetch all attachment types', async () => {
        await provider.addInteraction(getAttachmentTypes);
        const response = await client!.attachments.getTypes();

        expect(response).toHaveLength(1);
        expect(response[0].name).toEqual('TYPE');
        expect(response[0].label).toEqual('My attachment type');
      });
    },
  );
});
