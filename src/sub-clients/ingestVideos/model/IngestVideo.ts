import { Channel } from './Channel';
import { IngestJob } from './IngestJob';

export interface IngestVideo {
  id: string;
  title: string;
  status: string;
  ingestStartedAt: Date;
  channel: Channel;
  ingestJob: IngestJob;
}
