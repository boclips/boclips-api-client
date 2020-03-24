import axios, { AxiosError, AxiosInstance } from 'axios';
import { BoclipsClient } from './BoclipsClient';
import { ApiOrganisationsClient } from './sub-clients/organisations/client/ApiOrganisationsClient';
import { AdminLinksConverter } from './sub-clients/adminLinks/AdminLinksConverter';
import { AdminLinks } from './sub-clients/adminLinks/model/AdminLinks';
import { ApiBestForTagsClient } from './sub-clients/bestForTags/client/ApiBestForClients';
import { BestForTagsClient } from './sub-clients/bestForTags/client/BestForTagsClient';
import { ApiCollectionsClient } from './sub-clients/collections/client/ApiCollectionsClient';
import { ApiContentPartnersClient } from './sub-clients/contentPartners/client/ApiContentPartnersClient';
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
import { ApiSubjectsClient } from './sub-clients/subjects/client/ApiSubjectsClient';
import { ApiVideoTypesClient } from './sub-clients/videoTypes/client/ApiVideoTypes';
import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { BoclipsApiError } from './types';

const isAxiosError = (error: any): error is AxiosError => {
  return error.response != undefined && error.response.data != undefined;
};

export class ApiBoclipsClient implements BoclipsClient {
  private static instance: ApiBoclipsClient;
  public legalRestrictionsClient: ApiLegalRestrictionsClient;
  public contentPartnersClient: ApiContentPartnersClient;
  public subjectsClient: ApiSubjectsClient;
  public collectionsClient: ApiCollectionsClient;
  public ordersClient: ApiOrdersClient;
  public eventsClient: ApiEventsClient;
  public jobsClient: ApiJobsClient;
  public organisationsClient: ApiOrganisationsClient;
  public videoTypesClient: VideoTypesClient;
  public ingestVidoesClient: IngestVideosClient;
  public bestForTagsClient: BestForTagsClient;
  public marketingStatusesClient: MarketingStatusesClient;
  public eduAgeRangesClient: EduAgeRangesClient;
  public ingestVideoStatusesClient: ApiIngestVideoStatusesClient;
  private readonly axiosInstance: AxiosInstance;
  private adminLinks: AdminLinks;

  private constructor(initialAxios: AxiosInstance, private baseUrl: string) {
    this.axiosInstance = axios.create();

    (initialAxios.interceptors.request as any).forEach(interceptor => {
      this.axiosInstance.interceptors.request.use(
        interceptor.fulfilled,
        interceptor.rejected,
      );
    });

    (initialAxios.interceptors.response as any).forEach(interceptor => {
      this.axiosInstance.interceptors.response.use(
        interceptor.fulfilled,
        interceptor.rejected,
      );
    });

    this.axiosInstance.interceptors.response.use(
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

  public static reset = () => {
    ApiBoclipsClient.instance = null;
  };

  private async setUpAdminLinks() {
    const response = await this.axiosInstance.get(`${this.baseUrl}/v1/admin`);

    this.adminLinks = AdminLinksConverter.convert(response.data);
  }

  private setUpSubClients() {
    this.legalRestrictionsClient = new ApiLegalRestrictionsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.contentPartnersClient = new ApiContentPartnersClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.subjectsClient = new ApiSubjectsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.collectionsClient = new ApiCollectionsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.ordersClient = new ApiOrdersClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.eventsClient = new ApiEventsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.jobsClient = new ApiJobsClient(this.adminLinks, this.axiosInstance);
    this.organisationsClient = new ApiOrganisationsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.videoTypesClient = new ApiVideoTypesClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.ingestVidoesClient = new ApiIngestVideosClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.bestForTagsClient = new ApiBestForTagsClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.marketingStatusesClient = new ApiMarketingStatusesClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.eduAgeRangesClient = new ApiEduAgeRangesClient(
      this.adminLinks,
      this.axiosInstance,
    );
    this.ingestVideoStatusesClient = new ApiIngestVideoStatusesClient(
      this.adminLinks,
      this.axiosInstance,
    );
  }
}
