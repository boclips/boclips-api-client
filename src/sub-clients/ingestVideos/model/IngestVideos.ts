import { ContentPartner } from './ContentPartner';
import { IngestJob } from './IngestJob';

export interface IngestVideos {
  id: string;
  title: string;
  status: string;
  ingestStartedAt: Date;
  contentPartner: ContentPartner;
  ingestJob: IngestJob;
}
