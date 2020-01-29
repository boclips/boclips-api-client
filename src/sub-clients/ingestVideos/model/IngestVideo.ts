import { ContentPartner } from './ContentPartner';
import { IngestJob } from './IngestJob';

export interface IngestVideo {
  id: string;
  title: string;
  status: string;
  ingestStartedAt: Date;
  contentPartner: ContentPartner;
  ingestJob: IngestJob;
}
