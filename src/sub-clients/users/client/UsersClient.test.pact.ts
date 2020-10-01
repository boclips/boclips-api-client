import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { UserFactory } from '../../../test-support/UserFactory';
import { User } from '../../organisations/model/User';
import {
  activeUser,
  getCurrentUser,
  inactiveUser,
} from '../pact/UsersInteractions';

describe('UsersClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.users.insertActiveUserId(
            'b66f6f98-3c5b-49e3-ac1b-2e8def6c95c0',
          );

          client.users.insertCurrentUser(
            UserFactory.sample({ features: { LTI_SLS_TERMS_BUTTON: true } }),
          );
        }
      });

      it(`can evaluate inactive user`, async () => {
        await provider.addInteraction(inactiveUser('non-existing-id'));

        const response: boolean = await client.users.isUserActive(
          'non-existing-id',
        );

        expect(response).toBeFalsy();
      });

      it(`can evaluate active user`, async () => {
        await provider.addInteraction(
          activeUser('b66f6f98-3c5b-49e3-ac1b-2e8def6c95c0'),
        );

        const response: boolean = await client.users.isUserActive(
          'b66f6f98-3c5b-49e3-ac1b-2e8def6c95c0',
        );

        expect(response).toBeTruthy();
      });

      it("can load the current user's profile", async () => {
        await provider.addInteraction(getCurrentUser());

        const user: User = await client.users.getCurrentUser();

        expect(user.features.LTI_SLS_TERMS_BUTTON).toEqual(true);
      });
    },
  );
});
