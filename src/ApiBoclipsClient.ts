import { ApiIngestVideoStatusesClient } from './sub-clients/ingestVideoStatuses/client/ApiIngestVideoStatusesClient';
import { AxiosError, AxiosInstance } from 'axios';
import { BoclipsClient } from './BoclipsClient';
import { ApiAccountsClient } from './sub-clients/accounts/client/ApiAccountsClient';
import { AdminLinksConverter } from './sub-clients/adminLinks/AdminLinksConverter';
import { AdminLinks } from './sub-clients/adminLinks/model/AdminLinks';
import { ApiBestForTagsClient } from './sub-clients/bestForTags/client/ApiBestForClients';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { ApiCollectionsClient } from './sub-clients/collections/client/ApiCollectionsClient';
import { ApiContentPartnersClient } from './sub-clients/contentPartners/client/ApiContentPartnersClient';
import { ApiEduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/ApiEduAgeRangesClient';
import { EduAgeRangesClient } from './sub-clients/educationalAgeRanges/client/EduAgeRangesClient';
import { ApiEventsClient } from './sub-clients/events/client/ApiEventsClient';
import { ApiHttpFeedsClient } from './sub-clients/httpFeeds/client/ApiHttpFeedsClient';
import { ApiIngestVideosClient } from './sub-clients/ingestVideos/client/ApiIngestVideosClient';
import { IngestVideosClient } from './sub-clients/ingestVideos/client/IngestVideosClient';
import { ApiJobsClient } from './sub-clients/jobs/client/ApiJobsClient';
import { ApiLegalRestrictionsClient } from './sub-clients/legalRestrictions/client/ApiLegalRestrictionsClient';
import { ApiMarketingStatusesClient } from './sub-clients/marketingStatuses/client/ApiMarketingStatusesClient';
import { MarketingStatusesClient } from './sub-clients/marketingStatuses/client/MarketingStatusesClient';
import { ApiOrdersClient } from './sub-clients/orders/client/ApiOrdersClient';
import { ApiSubjectsClient } from './sub-clients/subjects/client/ApiSubjectsClient';
import { ApiVideoTypesClient } from './sub-clients/videoTypes/client/ApiVideoTypes';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { BoclipsApiError } from './types/BoclipsApiError';

const isAxiosError = (error: any): error is AxiosError => {
  return error.response != undefined && error.response.data != undefined;
};

export class ApiBoclipsClient implements BoclipsClient {
  private static instance: ApiBoclipsClient;
  private axios: AxiosInstance;
  private baseUrl: string;
  private adminLinks: AdminLinks;

  public legalRestrictionsClient: ApiLegalRestrictionsClient;
  public contentPartnersClient: ApiContentPartnersClient;
  public subjectsClient: ApiSubjectsClient;
  public feedsClient: ApiHttpFeedsClient;
  public collectionsClient: ApiCollectionsClient;
  public ordersClient: ApiOrdersClient;
  public eventsClient: ApiEventsClient;
  public jobsClient: ApiJobsClient;
  public accountsClient: ApiAccountsClient;
  public videoTypesClient: VideoTypesClient;
  public ingestVidoesClient: IngestVideosClient;
  public bestForTagsClient: BestForTagsClient;
  public marketingStatusesClient: MarketingStatusesClient;
  public eduAgeRangesClient: EduAgeRangesClient;
  public ingestVideoStatusesClient: ApiIngestVideoStatusesClient;

  private constructor(axios: AxiosInstance, baseUrl: string) {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (isAxiosError(error)) {
          const boError: BoclipsApiError = {
            error: error.response.data.error || error.response.statusText,
            message: error.response.data.message || 'Request failed',
            path: error.response.data.path || error.request.path,
            status: error.response.data.status || error.response.status,
            timestamp:
              error.response.data.timestamp ||
              new Date(error.response.headers.date),
          };

          return Promise.reject(boError);
        } else {
          // not sure if we will ever get here
          return Promise.reject(error);
        }
      },
    );

    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initialize = async (axios: AxiosInstance, baseUrl: string) => {
    if (!ApiBoclipsClient.instance) {
      const client = new ApiBoclipsClient(axios, baseUrl);

      await client.setUpAdminLinks();
      client.setUpSubClients();

      ApiBoclipsClient.instance = client;
    }

    return ApiBoclipsClient.instance;
  };

  private async setUpAdminLinks() {
    // TODO(AO/EV): Consider moving this to clients/adminLinks
    const response = await this.axios.get(`${this.baseUrl}/v1/admin`);

    this.adminLinks = AdminLinksConverter.convert(response.data);
  }

  private setUpSubClients() {
    this.legalRestrictionsClient = new ApiLegalRestrictionsClient(
      this.adminLinks,
      this.axios,
    );
    this.contentPartnersClient = new ApiContentPartnersClient(
      this.adminLinks,
      this.axios,
    );
    this.subjectsClient = new ApiSubjectsClient(this.adminLinks, this.axios);
    this.feedsClient = new ApiHttpFeedsClient(this.adminLinks, this.axios);
    this.collectionsClient = new ApiCollectionsClient(
      this.adminLinks,
      this.axios,
    );
    this.ordersClient = new ApiOrdersClient(this.adminLinks, this.axios);
    this.eventsClient = new ApiEventsClient(this.adminLinks, this.axios);
    this.jobsClient = new ApiJobsClient(this.adminLinks, this.axios);
    this.accountsClient = new ApiAccountsClient(this.adminLinks, this.axios);
    this.videoTypesClient = new ApiVideoTypesClient(
      this.adminLinks,
      this.axios,
    );
    this.ingestVidoesClient = new ApiIngestVideosClient(
      this.adminLinks,
      this.axios,
    );
    this.bestForTagsClient = new ApiBestForTagsClient(
      this.adminLinks,
      this.axios,
    );
    this.marketingStatusesClient = new ApiMarketingStatusesClient(
      this.adminLinks,
      this.axios,
    );
    this.eduAgeRangesClient = new ApiEduAgeRangesClient(
      this.adminLinks,
      this.axios,
    );
    this.ingestVideoStatusesClient = new ApiIngestVideoStatusesClient(
      this.adminLinks,
      this.axios,
    );
  }
}
