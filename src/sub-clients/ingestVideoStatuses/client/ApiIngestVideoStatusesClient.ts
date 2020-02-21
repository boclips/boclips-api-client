import { IngestVideoStatusesClient } from './IngestVideoStatusesClient';
import { ApiSubClient } from '../../common/client/ApiSubClient';

export class ApiIngestVideoStatusesClient extends ApiSubClient
  implements IngestVideoStatusesClient {
  getAll(): Promise<string[]> {
    const statusesLink = this.getLinkOrThrow('ingestVideoStatuses');
    return this.axios.get(statusesLink.href).then(it => {
      try {
        return it.data._embedded.ingestVideoStatuses;
      } catch (e) {
        throw new Error(`Could not unpack ingest video statuses because: ${e}`);
      }
    });
  }
}
