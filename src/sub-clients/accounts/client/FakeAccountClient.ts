import Pageable from '../../common/model/Pageable';
import { PageableFactory } from '../../common/model/PageableFactory';
import { Clearable } from '../../common/utils/Clearable';
import { Account } from '../model/Account';
import { UpdateAccountRequest } from '../model/UpdateAccountRequest';
import { AccountsClient, AccountsFilter } from './AccountsClient';

export class FakeAccountsClient implements AccountsClient, Clearable {
  private accounts: Account[] = [];

  public getAccounts(
    filter: AccountsFilter = {
      size: 30,
      page: 0,
      countryCode: undefined,
    },
  ): Promise<Pageable<Account> | null> {
    const filteredAccounts = !!filter.countryCode
      ? this.accounts.filter(
          account => account.organisation.country.id === filter.countryCode,
        )
      : this.accounts;

    const pageOfAccounts = filteredAccounts.slice(
      filter.size * filter.page,
      filter.size * (filter.page + 1),
    );

    const pageable = PageableFactory.sample(pageOfAccounts, {
      size: filter.size,
      number: filter.page,
      totalElements: filteredAccounts.length,
    });

    return Promise.resolve(pageable);
  }

  public async updateAccount(
    account: Account,
    updateAccountRequest: UpdateAccountRequest,
  ): Promise<Account> {
    const index = this.accounts.findIndex(it => it.id === account.id);

    if (index > -1) {
      this.accounts[index].accessExpiresOn =
        updateAccountRequest.accessExpiresOn;

      return Promise.resolve(this.accounts[index]);
    } else {
      return Promise.reject();
    }
  }

  public insertAccountFixture(account: Account) {
    this.accounts.push(account);
  }

  public clear() {
    this.accounts = [];
  }
}
