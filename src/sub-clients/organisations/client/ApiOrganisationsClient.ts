import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageableEntity } from '../../common/model/PageableEntity';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Organisation } from '../model/Organisation';
import { OrganisationEntity } from '../model/OrganisationEntity';
import { OrganisationsConverter } from '../model/OrganisationsConverter';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';
import {
  OrganisationsClient,
  OrganisationFilters,
} from './OrganisationsClient';

export class ApiOrganisationsClient extends ApiSubClient
  implements OrganisationsClient {
  public async getOrganisations(
    filter?: OrganisationFilters,
  ): Promise<Pageable<Organisation> | null> {
    const link = this.getLinkOrThrow('organisations');

    const response = await this.axios.get<PageableEntity<OrganisationEntity>>(
      expandUrlTemplate(link.href, {
        name: filter && filter.name,
        countryCode: filter && filter.countryCode,
        page: filter && filter.page,
        size: filter && filter.size,
      }),
    );

    return OrganisationsConverter.convertPage(response.data);
  }

  public async updateOrganisation(
    organisation: Organisation,
    updateOrganisationRequest: UpdateOrganisationRequest,
  ): Promise<Organisation> {
    const link = organisation.links.edit.getOriginalLink();

    const response = await this.axios.patch<OrganisationEntity>(
      link,
      updateOrganisationRequest,
    );

    return OrganisationsConverter.convert(response.data);
  }
}
