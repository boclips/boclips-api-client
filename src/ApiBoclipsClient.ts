import { AxiosInstance } from 'axios';
import createAxiosInstanceFrom from './axios/createAxiosInstanceFrom';
import { BoclipsClient } from './BoclipsClient';
import { AdminLinksConverter } from './sub-clients/adminLinks/AdminLinksConverter';
import { AdminLinks } from './sub-clients/adminLinks/model/AdminLinks';
import { ApiAttachmentsClient } from './sub-clients/attachments/client/ApiAttachmentsClient';
import { ApiBestForTagsClient } from './sub-clients/bestForTags/client/ApiBestForClients';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { ApiCollectionsClient } from './sub-clients/collections/client/ApiCollectionsClient';
import { ApiChannelsClient } from './sub-clients/channels/client/ApiChannelsClient';
import { ApiContractLegalRestrictionsClient } from './sub-clients/contractLegalRestrictions/client/ApiContractLegalRestrictionsClient';
import { ContractLegalRestrictionsClient } from './sub-clients/contractLegalRestrictions/client/ContractLegalRestrictionsClient';
import { ApiEduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/ApiEduAgeRangesClient';
import { EduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/EduAgeRangesClient';
import { ApiEventsClient } from './sub-clients/events/client/ApiEventsClient';
import { ApiIngestVideosClient } from './sub-clients/ingestVideos/client/ApiIngestVideosClient';
import { IngestVideosClient } from './sub-clients/ingestVideos/client/IngestVideosClient';
import { ApiIngestVideoStatusesClient } from './sub-clients/ingestVideoStatuses/client/ApiIngestVideoStatusesClient';
import { ApiJobsClient } from './sub-clients/jobs/client/ApiJobsClient';
import { ApiLegalRestrictionsClient } from './sub-clients/legalRestrictions/client/ApiLegalRestrictionsClient';
import { ApiMarketingStatusesClient } from './sub-clients/marketingStatuses/client/ApiMarketingStatusesClient';
import { MarketingStatusesClient } from './sub-clients/marketingStatuses/client/MarketingStatusesClient';
import { ApiOrdersClient } from './sub-clients/orders/client/ApiOrdersClient';
import { ApiOrganisationsClient } from './sub-clients/organisations/client/ApiOrganisationsClient';
import { ApiSubjectsClient } from './sub-clients/subjects/client/ApiSubjectsClient';
import { ApiVideosClient } from './sub-clients/videos/client/ApiVideosClient';
import { VideosClient } from './sub-clients/videos/client/VideosClient';
import { ApiVideoTypesClient } from './sub-clients/videoTypes/client/ApiVideoTypes';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { SuggestionsClient } from './sub-clients/suggestions/client/SuggestionsClient';
import { ApiSuggestionsClient } from './sub-clients/suggestions/client/ApiSuggestionsClient';
import { ContentWarningsClient } from './sub-clients/contentWarnings/client/ContentWarningsClient';
import { ApiContentWarningsClient } from './sub-clients/contentWarnings/client/ApiContentWarningsClient';
import { ContractsClient } from './sub-clients/contracts/client/ContractsClient';
import { ApiContractsClient } from './sub-clients/contracts/client/ApiContractsClient';
import { ApiShareCodesClient } from './sub-clients/shareCodes/client/ApiShareCodesClient';

export class ApiBoclipsClient implements BoclipsClient {
  public legalRestrictions: ApiLegalRestrictionsClient;
  public channels: ApiChannelsClient;
  public subjects: ApiSubjectsClient;
  public collections: ApiCollectionsClient;
  public orders: ApiOrdersClient;
  public events: ApiEventsClient;
  public jobs: ApiJobsClient;
  public organisations: ApiOrganisationsClient;
  public videoTypes: VideoTypesClient;
  public ingestVidoes: IngestVideosClient;
  public bestForTags: BestForTagsClient;
  public marketingStatuses: MarketingStatusesClient;
  public eduAgeRanges: EduAgeRangesClient;
  public ingestVideoStatuses: ApiIngestVideoStatusesClient;
  public contracts: ContractsClient;
  public contractLegalRestrictions: ContractLegalRestrictionsClient;
  public videos: VideosClient;
  public suggestions: SuggestionsClient;
  public contentWarnings: ContentWarningsClient;
  public shareCodes: ApiShareCodesClient;
  public attachments: ApiAttachmentsClient;

  constructor(axios: AxiosInstance, adminLinks: AdminLinks) {
    this.legalRestrictions = new ApiLegalRestrictionsClient(adminLinks, axios);
    this.channels = new ApiChannelsClient(adminLinks, axios);
    this.subjects = new ApiSubjectsClient(adminLinks, axios);
    this.collections = new ApiCollectionsClient(adminLinks, axios);
    this.orders = new ApiOrdersClient(adminLinks, axios);
    this.events = new ApiEventsClient(adminLinks, axios);
    this.jobs = new ApiJobsClient(adminLinks, axios);
    this.organisations = new ApiOrganisationsClient(adminLinks, axios);
    this.videoTypes = new ApiVideoTypesClient(adminLinks, axios);
    this.ingestVidoes = new ApiIngestVideosClient(adminLinks, axios);
    this.bestForTags = new ApiBestForTagsClient(adminLinks, axios);
    this.marketingStatuses = new ApiMarketingStatusesClient(adminLinks, axios);
    this.eduAgeRanges = new ApiEduAgeRangesClient(adminLinks, axios);
    this.ingestVideoStatuses = new ApiIngestVideoStatusesClient(
      adminLinks,
      axios,
    );
    this.contracts = new ApiContractsClient(adminLinks, axios);
    this.contractLegalRestrictions = new ApiContractLegalRestrictionsClient(
      adminLinks,
      axios,
    );
    this.videos = new ApiVideosClient(adminLinks, axios);
    this.suggestions = new ApiSuggestionsClient(adminLinks, axios);
    this.contentWarnings = new ApiContentWarningsClient(adminLinks, axios);
    this.shareCodes = new ApiShareCodesClient(adminLinks, axios);
    this.attachments = new ApiAttachmentsClient(adminLinks, axios);
  }

  public static create = async (
    prototypeInstance: AxiosInstance,
    baseUrl: string,
  ): Promise<ApiBoclipsClient> => {
    const axios = createAxiosInstanceFrom(prototypeInstance);
    const adminLinksResponse = await axios.get(`${baseUrl}/v1/admin`);
    const adminLinks = AdminLinksConverter.convert(adminLinksResponse.data);
    return new ApiBoclipsClient(axios, adminLinks);
  };
}
