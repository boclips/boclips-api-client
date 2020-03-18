import Pageable from '../../common/model/Pageable';
import { Organisation } from '../model/Organisation';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';
import { User } from '../model/User';

export interface OrganisationFilters {
  name?: string;
  countryCode?: string;
  page?: number;
  size?: number;
}

export interface OrganisationsClient {
  getOrganisations(
    organisationFilters?: OrganisationFilters,
  ): Promise<Pageable<Organisation> | null>;

  updateOrganisation(
    organisation: Organisation,
    updateAccountRequest: UpdateOrganisationRequest,
  ): Promise<Organisation>;

  associateUsers(organisation: Organisation): Promise<User[]>;
}
