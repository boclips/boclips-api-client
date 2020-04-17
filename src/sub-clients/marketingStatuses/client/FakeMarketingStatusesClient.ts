import { Clearable } from '../../common/utils/Clearable';
import { MarketingStatusesClient } from './MarketingStatusesClient';

export class FakeMarketingStatusesClient
  implements MarketingStatusesClient, Clearable {
  private marketingStatuses: string[] = [];

  public setMarketingStatuses = (newStatuses: string[]) =>
    (this.marketingStatuses = newStatuses);

  public getAll = (): Promise<string[]> =>
    Promise.resolve(this.marketingStatuses);

  public clear() {
    this.marketingStatuses = [];
  }
}
