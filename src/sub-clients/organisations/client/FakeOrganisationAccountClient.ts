import Pageable from '../../common/model/Pageable';
import { PageableFactory } from '../../common/model/PageableFactory';
import { Clearable } from '../../common/utils/Clearable';
import { OrganisationAccount } from '../model/OrganisationAccount';
import {
  IndependentAccountsFilter,
  OrganisationAccountsClient,
} from './OrganisationAccountsClient';

export class FakeOrganisationAccountsClient
  implements OrganisationAccountsClient, Clearable {
  private organisationAccounts: OrganisationAccount[] = [];

  public getIndependentAccounts(
    filter: IndependentAccountsFilter,
  ): Promise<Pageable<OrganisationAccount> | null> {
    const filteredAccounts = this.organisationAccounts.filter(
      account => account.organisation.country.id === filter.countryCode,
    );

    const pageable = PageableFactory.sample(filteredAccounts, {
      size: filter.size,
      number: filter.page,
    });

    return Promise.resolve(pageable);
  }

  public insertOrganisationFixture(entity: OrganisationAccount) {
    this.organisationAccounts.push(entity);
  }

  public clear() {
    this.organisationAccounts = [];
  }
}
