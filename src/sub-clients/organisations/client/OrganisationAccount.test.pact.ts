import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { OrganisationAccountFactory } from '../model/OrganisationAccountFactory';
import { provider } from '../../../pact-support/pactSetup';
import { getOrganisationAccountsByCountryCode } from '../pact/OrganisationAccountInteractions';

const ORGANISATION_ID_FROM_STAGING = '5de5369d1617b3000142c08f';

describe('OrganisationAccount', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.organisationAccountsClient.insertOrganisationFixture(
            OrganisationAccountFactory.sample({
              id: ORGANISATION_ID_FROM_STAGING,
            }),
          );
        }
      });

      it('can fetch all independent organisations from USA', async () => {
        await provider.addInteraction(
          getOrganisationAccountsByCountryCode(
            ORGANISATION_ID_FROM_STAGING,
            'USA',
          ),
        );
        const organisationAccountsPage = await client.organisationAccountsClient.getIndependentAccounts(
          { countryCode: 'USA', page: 0, size: 30 },
        );

        expect(organisationAccountsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          organisationAccountsPage.page.some(
            account => account.id === ORGANISATION_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });
    },
  );
});
