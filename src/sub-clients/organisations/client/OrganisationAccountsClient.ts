import Pageable from '../../common/model/Pageable';
import { OrganisationAccount } from '../model/OrganisationAccount';

export interface IndependentAccountsFilter {
  countryCode: 'USA';
  page: number;
  size: number;
}

export interface OrganisationAccountsClient {
  getIndependentAccounts(
    independentAccountFilter: IndependentAccountsFilter,
  ): Promise<Pageable<OrganisationAccount> | null>;
}
