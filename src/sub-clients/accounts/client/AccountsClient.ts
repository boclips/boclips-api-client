import Pageable from '../../common/model/Pageable';
import { Account } from '../model/Account';

export interface AccountsFilter {
  countryCode: 'USA';
  page: number;
  size: number;
}

export interface AccountsClient {
  getIndependentAccounts(
    independentAccountFilter: AccountsFilter,
  ): Promise<Pageable<Account> | null>;
}
