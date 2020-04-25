import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnerContractsClient } from './sub-clients/contentPartnerContracts/client/ContentPartnerContractsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { ContractLegalRestrictionsClient } from './sub-clients/contractLegalRestrictions/client/ContractLegalRestrictionsClient';
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
import { SuggestionsClient } from './sub-clients/suggestions/client/SuggestionsClient';

export interface BoclipsClient {
  legalRestrictions: LegalRestrictionsClient;
  contentPartners: ContentPartnersClient;
  contentPartnerContracts: ContentPartnerContractsClient;
  subjects: SubjectsClient;
  collections: CollectionsClient;
  orders: OrdersClient;
  events: EventsClient;
  jobs: JobsClient;
  organisations: OrganisationsClient;
  videos: VideosClient;
  videoTypes: VideoTypesClient;
  ingestVidoes: IngestVideosClient;
  bestForTags: BestForTagsClient;
  eduAgeRanges: EduAgeRangesClient;
  marketingStatuses: MarketingStatusesClient;
  ingestVideoStatuses: IngestVideoStatusesClient;
  contractLegalRestrictions: ContractLegalRestrictionsClient;
  suggestions: SuggestionsClient;
}
