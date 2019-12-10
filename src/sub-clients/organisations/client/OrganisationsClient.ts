import { Organisation } from '../model/Organisation';
import { OrganisationUpdateRequest } from '../model/OrganisationUpdateRequest';

export interface OrganisationsClient {
  getIndependent(): Promise<Organisation[]>;
  update(
    organisationUpdateRequest: OrganisationUpdateRequest,
  ): Promise<Organisation>;
}
