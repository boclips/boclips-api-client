import Pageable from '../../common/model/Pageable';
import { PageableFactory } from '../../common/model/PageableFactory';
import { Clearable } from '../../common/utils/Clearable';
import { Organisation } from '../model/Organisation';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';
import {
  OrganisationsClient,
  OrganisationFilters,
} from './OrganisationsClient';

export class FakeOrganisationsClient implements OrganisationsClient, Clearable {
  private organisations: Organisation[] = [];

  public getOrganisations(
    filter: OrganisationFilters = {
      size: 30,
      page: 0,
      name: undefined,
      countryCode: undefined,
    },
  ): Promise<Pageable<Organisation> | null> {
    const filteredOrganisations = !!filter.countryCode
      ? this.organisations.filter(
          organisation =>
            organisation.organisationDetails.country.id === filter.countryCode,
        )
      : this.organisations;

    const pageOfOrganisations = filteredOrganisations.slice(
      filter.size * filter.page,
      filter.size * (filter.page + 1),
    );

    const pageable = PageableFactory.sample(pageOfOrganisations, {
      size: filter.size,
      number: filter.page,
      totalElements: filteredOrganisations.length,
    });

    return Promise.resolve(pageable);
  }

  public async updateOrganisation(
    organisation: Organisation,
    updateOrganisationRequest: UpdateOrganisationRequest,
  ): Promise<Organisation> {
    const index = this.organisations.findIndex(it => it.id === organisation.id);

    if (index > -1) {
      this.organisations[index].accessExpiresOn =
        updateOrganisationRequest.accessExpiresOn;

      return Promise.resolve(this.organisations[index]);
    } else {
      return Promise.reject();
    }
  }

  public associateUsers() {
    return Promise.resolve([]);
  }

  public insertOrganisationFixture(organisation: Organisation) {
    this.organisations.push(organisation);
  }

  public clear() {
    this.organisations = [];
  }
}
