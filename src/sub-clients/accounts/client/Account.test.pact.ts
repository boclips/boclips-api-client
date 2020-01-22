import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { AccountFactory } from '../../../test-support/AccountFactory';
import { UpdateAccountRequest } from '../model/UpdateAccountRequest';
import {
  getAccountsByCountryCode,
  updateAccount,
} from '../pact/AccountInteractions';

const USA_ACCOUNT_ID_FROM_STAGING = '5de5369d1617b3000142c08f';

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
        }
      });

      it('can fetch all accounts from USA', async () => {
        await provider.addInteraction(
          getAccountsByCountryCode(USA_ACCOUNT_ID_FROM_STAGING, 'USA'),
        );
        const accountsPage = await client.accountsClient.getAccounts({
          countryCode: 'USA',
          page: 0,
          size: 30,
        });

        expect(accountsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          accountsPage.page.some(
            account => account.id === USA_ACCOUNT_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });

      it('can fetch all accounts', async () => {
        await provider.addInteraction(
          getAccountsByCountryCode(USA_ACCOUNT_ID_FROM_STAGING, 'USA'),
        );
        const accountsPage = await client.accountsClient.getAccounts({
          countryCode: 'USA',
          page: 0,
          size: 30,
        });

        expect(accountsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          accountsPage.page.some(
            account => account.id === USA_ACCOUNT_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });

      it(`can edit an account's access expiry date`, async () => {
        const updatedTime = '2020-12-21T00:00:00.000';
        const updateRequest: UpdateAccountRequest = {
          accessExpiresOn: new Date(updatedTime),
        };
        await provider.addInteraction(
          getAccountsByCountryCode(USA_ACCOUNT_ID_FROM_STAGING, 'USA'),
        );
        await provider.addInteraction(
          updateAccount(USA_ACCOUNT_ID_FROM_STAGING, updateRequest),
        );
        const accountPage = await client.accountsClient.getAccounts({
          countryCode: 'USA',
          page: 0,
          size: 30,
        });

        const updatedAccount = await client.accountsClient.updateAccount(
          accountPage.page[0],
          updateRequest,
        );

        expect(updatedAccount.accessExpiresOn).toEqual(new Date(updatedTime));
      });
    },
  );
});
