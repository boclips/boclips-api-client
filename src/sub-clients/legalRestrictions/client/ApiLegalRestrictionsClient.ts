import { ApiSubClient } from '../../common/client/ApiSubClient';
import { LegalRestrictionsConverter } from '../LegalRestrictionsConverter';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class ApiLegalRestrictionsClient extends ApiSubClient
  implements LegalRestrictionsClient {
  public getAll() {
    const legalRestrictionsLink = this.getLinkOrThrow('legalRestrictions');

    return this.axios
      .get(legalRestrictionsLink.href)
      .then(response => LegalRestrictionsConverter.convert(response.data));
  }
}
