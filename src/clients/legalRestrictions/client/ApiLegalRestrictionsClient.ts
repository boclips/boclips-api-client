import { ApiClient } from '../../common/client/ApiClient';
import { LegalRestrictionsConverter } from '../LegalRestrictionsConverter';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class ApiLegalRestrictionsClient extends ApiClient
  implements LegalRestrictionsClient {
  public getAll() {
    const legalRestrictionsLink = this.getLinkOrThrow('legalRestrictions');

    return this.axios
      .get(legalRestrictionsLink.href)
      .then(response => LegalRestrictionsConverter.convert(response.data));
  }
}
