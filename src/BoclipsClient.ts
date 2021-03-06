import { AttachmentsClient } from './sub-clients/attachments/client/AttachmentsClient';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ChannelsClient } from './sub-clients/channels/client/ChannelsClient';
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
import { ContentWarningsClient } from './sub-clients/contentWarnings/client/ContentWarningsClient';
import { ContractsClient } from './sub-clients/contracts/client/ContractsClient';
import { ShareCodesClient } from './sub-clients/shareCodes/client/ShareCodesClient';
import { ContentPackagesClient } from './sub-clients/contentPackages/client/ContentPackagesClient';
import { UsersClient } from './sub-clients/users/client/UsersClient';
import { CartsClient } from './sub-clients/carts/client/CartsClient';

export interface BoclipsClient {
  legalRestrictions: LegalRestrictionsClient;
  channels: ChannelsClient;
  contracts: ContractsClient;
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
  contentWarnings: ContentWarningsClient;
  suggestions: SuggestionsClient;
  shareCodes: ShareCodesClient;
  attachments: AttachmentsClient;
  contentPackages: ContentPackagesClient;
  users: UsersClient;
  carts: CartsClient;
}
