import { ApiClient } from '../../common/client/ApiClient';
import { LegalRestrictionsConverter } from '../LegalRestrictionsConverter';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class ApiLegalRestrictionsClient extends ApiClient
  implements LegalRestrictionsClient {
  public async getAll() {
    return this.requestWithAdminLink('legalRestrictions', async () => {
      const response = await this.axios.get(
        this.adminLinks.legalRestrictions.href,
      );
      return LegalRestrictionsConverter.convert(response.data);
    });
  }
}
