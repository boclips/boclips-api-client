import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnerContractsClient } from './sub-clients/contentPartnerContracts/client/ContentPartnerContractsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { EduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/EduAgeRangesClient';
import { EventsClient } from './sub-clients/events/client/EventsClient';
import { IngestVideosClient } from './sub-clients/ingestVideos/client/IngestVideosClient';
import { IngestVideoStatusesClient } from './sub-clients/ingestVideoStatuses/client/IngestVideoStatusesClient';
import { JobsClient } from './sub-clients/jobs/client/JobsClient';
import { LegalRestrictionsClient } from './sub-clients/legalRestrictions/client/LegalRestrictionsClient';
import { MarketingStatusesClient } from './sub-clients/marketingStatuses/client/MarketingStatusesClient';
import { OrdersClient } from './sub-clients/orders/client/OrdersClient';
import { OrganisationsClient } from './sub-clients/organisations/client/OrganisationsClient';
import { SubjectsClient } from './sub-clients/subjects/client/SubjectsClient';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { VideosClient } from './sub-clients/videos/client/VideosClient';

export interface BoclipsClient {
  legalRestrictionsClient: LegalRestrictionsClient;
  contentPartnersClient: ContentPartnersClient;
  contentPartnerContractsClient: ContentPartnerContractsClient;
  subjectsClient: SubjectsClient;
  collectionsClient: CollectionsClient;
  ordersClient: OrdersClient;
  eventsClient: EventsClient;
  jobsClient: JobsClient;
  organisationsClient: OrganisationsClient;
  videosClient: VideosClient;
  videoTypesClient: VideoTypesClient;
  ingestVidoesClient: IngestVideosClient;
  bestForTagsClient: BestForTagsClient;
  eduAgeRangesClient: EduAgeRangesClient;
  marketingStatusesClient: MarketingStatusesClient;
  ingestVideoStatusesClient: IngestVideoStatusesClient;
}
