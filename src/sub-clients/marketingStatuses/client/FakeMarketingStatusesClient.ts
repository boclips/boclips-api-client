import { MarketingStatusesClient } from './MarketingStatusesClient';

export class FakeMarketingStatusesClient implements MarketingStatusesClient {
  private marketingStatuses = [];

  public setMarketingStatuses = (newStatuses: string[]) =>
    (this.marketingStatuses = newStatuses);

  public getAll = (): Promise<string[]> =>
    Promise.resolve(this.marketingStatuses);
}
