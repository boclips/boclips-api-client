import { AxiosInstance } from 'axios';
import { BoclipsClient } from './BoclipsClient';
import { AdminLinksConverter } from './clients/adminLinks/AdminLinksConverter';
import { AdminLinks } from './clients/adminLinks/model/AdminLinks';
import { ApiCollectionsClient } from './clients/collections/client/ApiCollectionsClient';
import { ApiContentPartnersClient } from './clients/contentPartners/client/ApiContentPartnersClient';
import { ApiHttpFeedsClient } from './clients/httpFeeds/client/ApiHttpFeedsClient';
import { ApiLegalRestrictionsClient } from './clients/legalRestrictions/client/ApiLegalRestrictionsClient';
import { ApiSubjectsClient } from './clients/subjects/client/ApiSubjectsClient';

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

  private constructor(axios: AxiosInstance, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initialize = async (axios: AxiosInstance, baseUrl: string) => {
    if (!ApiBoclipsClient.instance) {
      const client = new ApiBoclipsClient(axios, baseUrl);

      await client.setUpAdminLinks();
      client.setUpClients();

      ApiBoclipsClient.instance = client;
    }

    return ApiBoclipsClient.instance;
  };

  private async setUpAdminLinks() {
    // TODO(AO/EV): Consider moving this to clients/adminLinks
    const response = await this.axios.get(`${this.baseUrl}/v1/admin`);

    this.adminLinks = AdminLinksConverter.convert(response.data);
  }

  private setUpClients() {
    this.legalRestrictionsClient = new ApiLegalRestrictionsClient();
    this.contentPartnersClient = new ApiContentPartnersClient();
    this.subjectsClient = new ApiSubjectsClient();
    this.feedsClient = new ApiHttpFeedsClient();
    this.collectionsClient = new ApiCollectionsClient();

    [
      this.legalRestrictionsClient,
      this.contentPartnersClient,
      this.subjectsClient,
      this.feedsClient,
      this.collectionsClient,
    ].forEach(controller => controller.initialize(this.adminLinks, this.axios));
  }
}
