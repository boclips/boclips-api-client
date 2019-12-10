import { ApiSubClient } from '../../common/client/ApiSubClient';
import { CollectionsClient } from '../../collections/client/CollectionsClient';
import { OrganisationsClient } from './OrganisationsClient';
import { Organisation, OrganisationEntity } from '../model/Organisation';
import { OrganisationUpdateRequest } from '../model/OrganisationUpdateRequest';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import {OrganisationConverter} from "../model/OrganisationConverter";

export class ApiOrganisationsClient extends ApiSubClient
  implements OrganisationsClient {
  public getIndependent(countryCode: string): Promise<Organisation[]> {
    const organisationsLink = this.getLinkOrThrow('independentOrganisations');

    return this.axios.get<OrganisationEntity>(
      expandUrlTemplate(organisationsLink.href, countryCode),
    ).then(response => OrganisationConverter(response))
  }

  update(
    organisationUpdateRequest: OrganisationUpdateRequest,
  ): Promise<Organisation> {
    return undefined;
  }
}
