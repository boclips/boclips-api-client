import { ApiIngestVideosClient } from './sub-clients/ingestVideos/client/ApiIngestVideosClient';
import { IngestVideosClient } from './sub-clients/ingestVideos/client/IngestVideosClient';
import { ApiVideoTypesClient } from './sub-clients/videoTypes/client/ApiVideoTypes';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { AxiosInstance, AxiosError } from 'axios';
import { BoclipsClient } from './BoclipsClient';
import { ApiAccountsClient } from './sub-clients/accounts/client/ApiAccountsClient';
import { AdminLinksConverter } from './sub-clients/adminLinks/AdminLinksConverter';
import { AdminLinks } from './sub-clients/adminLinks/model/AdminLinks';
import { ApiCollectionsClient } from './sub-clients/collections/client/ApiCollectionsClient';
import { ApiContentPartnersClient } from './sub-clients/contentPartners/client/ApiContentPartnersClient';
import { ApiEventsClient } from './sub-clients/events/client/ApiEventsClient';
import { ApiHttpFeedsClient } from './sub-clients/httpFeeds/client/ApiHttpFeedsClient';
import { ApiJobsClient } from './sub-clients/jobs/client/ApiJobsClient';
import { ApiLegalRestrictionsClient } from './sub-clients/legalRestrictions/client/ApiLegalRestrictionsClient';
import { ApiOrdersClient } from './sub-clients/orders/client/ApiOrdersClient';
import { ApiSubjectsClient } from './sub-clients/subjects/client/ApiSubjectsClient';
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

  private constructor(axios: AxiosInstance, baseUrl: string) {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (isAxiosError(error)) {
          const boError: BoclipsApiError = {
            error: error.response.data.error,
            message: error.response.data.message,
            path: error.response.data.path,
            status: error.response.data.status,
            timestamp: error.response.data.timestamp,
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
  }
}
