import Pageable from '../../common/model/Pageable';
import { Account } from '../model/Account';

export interface AccountsFilter {
  countryCode?: string;
  page?: number;
  size?: number;
}

export interface AccountsClient {
  getAccounts(
    accountsFilter?: AccountsFilter,
  ): Promise<Pageable<Account> | null>;
}
