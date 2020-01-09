import Pageable from '../../common/model/Pageable';
import { PageableFactory } from '../../common/model/PageableFactory';
import { Clearable } from '../../common/utils/Clearable';
import { Account } from '../model/Account';
import { AccountsClient, AccountsFilter } from './AccountsClient';

export class FakeAccountsClient implements AccountsClient, Clearable {
  private accounts: Account[] = [];

  public getIndependentAccounts(
    filter: AccountsFilter,
  ): Promise<Pageable<Account> | null> {
    const filteredAccounts = this.accounts.filter(
      account => account.organisation.country.id === filter.countryCode,
    );

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

  public insertAccountFixture(account: Account) {
    this.accounts.push(account);
  }

  public clear() {
    this.accounts = [];
  }
}
