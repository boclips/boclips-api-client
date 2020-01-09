import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { AccountFactory } from '../../../test-support/AccountFactory';
import { getIndependentAccountsByCountryCode } from '../pact/AccountInteractions';

const USA_ACCOUNT_ID_FROM_STAGING = '5de5369d1617b3000142c08f';
const GBR_ACCOUNT_ID_FROM_STAGING = '5d7b606e861a170001e11dc9';

describe('Account', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.accountsClient.insertAccountFixture(
            AccountFactory.sample({
              id: USA_ACCOUNT_ID_FROM_STAGING,
            }),
          );
          client.accountsClient.insertAccountFixture(
            AccountFactory.sample({
              id: GBR_ACCOUNT_ID_FROM_STAGING,
            }),
          );
        }
      });

      it('can fetch all independent accounts from USA', async () => {
        await provider.addInteraction(
          getIndependentAccountsByCountryCode(
            USA_ACCOUNT_ID_FROM_STAGING,
            'USA',
          ),
        );
        const accountsPage = await client.accountsClient.getIndependentAccounts(
          { countryCode: 'USA', page: 0, size: 30 },
        );

        expect(accountsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          accountsPage.page.some(
            account => account.id === USA_ACCOUNT_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });

      it('can fetch all independent accounts', async () => {
        if (isATestClient(await client)) {
          const accountsPage = await client.accountsClient.getIndependentAccounts();

          expect(accountsPage.page.length).toBeGreaterThanOrEqual(2);
          expect(
            accountsPage.page.some(
              account => account.id === USA_ACCOUNT_ID_FROM_STAGING,
            ),
          ).toBeTruthy();
          expect(
            accountsPage.page.some(
              account => account.id === GBR_ACCOUNT_ID_FROM_STAGING,
            ),
          ).toBeTruthy();
        }
      });
    },
  );
});
