import { AxiosInstance } from 'axios';
import { LegalRestrictionsConverter } from '../../converters/LegalRestrictionsConverter';
import BackofficeLinks from '../../types/BackofficeLinks';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class HttpLegalRestrictionsController
  implements LegalRestrictionsController {
  public constructor(
    private backofficeLinks: BackofficeLinks,
    private axios: AxiosInstance,
  ) {}

  public async getAll() {
    if (this.backofficeLinks && this.backofficeLinks.legalRestrictions) {
      const response = await this.axios.get(
        this.backofficeLinks.legalRestrictions.href,
      );
      return LegalRestrictionsConverter.convert(response.data);
    } else {
      throw new Error('Not authorized for method');
    }
  }
}
