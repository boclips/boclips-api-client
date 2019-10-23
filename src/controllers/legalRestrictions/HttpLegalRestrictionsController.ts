import { LegalRestrictionsConverter } from '../../converters/LegalRestrictionsConverter';
import { HttpController } from '../HttpController';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class HttpLegalRestrictionsController extends HttpController
  implements LegalRestrictionsController {
  public async getAll() {
    return this.requestWithAdminLink('legalRestrictions', async () => {
      const response = await this.axios.get(
        this.adminLinks.legalRestrictions.href,
      );
      return LegalRestrictionsConverter.convert(response.data);
    });
  }
}
