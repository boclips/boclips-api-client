import { ApiSubClient } from '../../common/client/ApiSubClient';
import { MarketingStatusesClient } from './MarketingStatusesClient';

export class ApiMarketingStatusesClient
  extends ApiSubClient
  implements MarketingStatusesClient {
  getAll = (): Promise<string[]> => {
    const marketingStatusesLink = this.getLinkOrThrow('marketingStatuses');
    return this.axios.get(marketingStatusesLink.href).then((it) => {
      try {
        return it.data._embedded.statuses;
      } catch (e) {
        throw new Error(`Could not unpack marketing statuses, got error: ${e}`);
      }
    });
  };
}
