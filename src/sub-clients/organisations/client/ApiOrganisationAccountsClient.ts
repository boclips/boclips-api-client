import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { OrganisationAccount } from '../model/OrganisationAccount';
import { OrganisationAccountConverter } from '../model/OrganisationAccountConverter';
import {
  IndependentAccountsFilter,
  OrganisationAccountsClient,
} from './OrganisationAccountsClient';

export class ApiOrganisationAccountsClient extends ApiSubClient
  implements OrganisationAccountsClient {
  public async getIndependentAccounts(
    filter: IndependentAccountsFilter,
  ): Promise<Pageable<OrganisationAccount> | null> {
    const link = this.getLinkOrThrow('independentOrganisations');

    const response = await this.axios.get(
      expandUrlTemplate(link.href, {
        countryCode: filter.countryCode,
        page: filter.page,
        size: filter.size,
      }),
    );

    return OrganisationAccountConverter.convertPage(response.data);
  }
}
