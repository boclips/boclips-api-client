import { IngestVideoStatusesClient } from './sub-clients/ingestVideoStatuses/client/IngestVideoStatusesClient';
import { AccountsClient } from './sub-clients/accounts/client/AccountsClient';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { EduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/EduAgeRangesClient';
import { EventsClient } from './sub-clients/events/client/EventsClient';
import { HttpFeedsClient } from './sub-clients/httpFeeds/client/HttpFeedsClient';
import { IngestVideosClient } from './sub-clients/ingestVideos/client/IngestVideosClient';
import { JobsClient } from './sub-clients/jobs/client/JobsClient';
import { LegalRestrictionsClient } from './sub-clients/legalRestrictions/client/LegalRestrictionsClient';
import { MarketingStatusesClient } from './sub-clients/marketingStatuses/client/MarketingStatusesClient';
import { OrdersClient } from './sub-clients/orders/client/OrdersClient';
import { SubjectsClient } from './sub-clients/subjects/client/SubjectsClient';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';

export interface BoclipsClient {
  legalRestrictionsClient: LegalRestrictionsClient;
  contentPartnersClient: ContentPartnersClient;
  subjectsClient: SubjectsClient;
  feedsClient: HttpFeedsClient;
  collectionsClient: CollectionsClient;
  ordersClient: OrdersClient;
  eventsClient: EventsClient;
  jobsClient: JobsClient;
  accountsClient: AccountsClient;
  videoTypesClient: VideoTypesClient;
  ingestVidoesClient: IngestVideosClient;
  bestForTagsClient: BestForTagsClient;
  eduAgeRangesClient: EduAgeRangesClient;
  marketingStatusesClient: MarketingStatusesClient;
  ingestVideoStatusesClient: IngestVideoStatusesClient;
}
