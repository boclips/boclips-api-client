import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ShareCodesClient } from './ShareCodesClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';

export class ApiShareCodesClient
  extends ApiSubClient
  implements ShareCodesClient {
  validate(referrer: string, shareCode: string): Promise<boolean> {
    const shareCodeLink = this.getLinkOrThrow('validateShareCode');
    return this.axios
      .get(expandUrlTemplate(shareCodeLink.href, { id: referrer, shareCode }))
      .then((response) => response.status === 200)
      .catch((_) => false);
  }
}
