import { Clearable } from '../../common/utils/Clearable';
import { IngestVideoStatusesClient } from './IngestVideoStatusesClient';

export class FakeIngestVideoStatusesClient
  implements IngestVideoStatusesClient, Clearable {
  private statuses = [];

  insertFixture(status: string) {
    this.statuses.push(status);
  }

  clear() {
    this.statuses = [];
  }
  getAll(): Promise<string[]> {
    return Promise.resolve(this.statuses);
  }
}
