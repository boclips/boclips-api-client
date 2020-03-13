import { OrganisationsClient } from './sub-clients/organisations/client/OrganisationsClient';
import { IngestVideoStatusesClient } from './sub-clients/ingestVideoStatuses/client/IngestVideoStatusesClient';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { AgeRangeClient } from './sub-clients/ageRange/client/AgeRangeClient';
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
  organisationsClient: OrganisationsClient;
  videoTypesClient: VideoTypesClient;
  ingestVidoesClient: IngestVideosClient;
  bestForTagsClient: BestForTagsClient;
  ageRangeClient: AgeRangeClient;
  marketingStatusesClient: MarketingStatusesClient;
  ingestVideoStatusesClient: IngestVideoStatusesClient;
}
