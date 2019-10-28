import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpCollectionsController } from './collections/HttpCollectionsController';
import { HttpContentPartnersController } from './controllers/contentPartners/HttpContentPartnersController';
import { HttpFeedsController } from './controllers/httpFeeds/HttpFeedsController';
import { HttpLegalRestrictionsController } from './controllers/legalRestrictions/HttpLegalRestrictionsController';
import { HttpSubjectsController } from './controllers/subjects/HttpSubjectsController';
import { AdminLinksConverter } from './converters/AdminLinksConverter';
import { AdminLinks } from './types';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private static instance: HttpBoclipsApiClient;
  private axios: AxiosInstance;
  private baseUrl: string;
  private adminLinks: AdminLinks;

  public legalRestrictionsController: HttpLegalRestrictionsController;
  public contentPartnersController: HttpContentPartnersController;
  public subjectsController: HttpSubjectsController;
  public feedsController: HttpFeedsController;
  public collectionsController: HttpCollectionsController;

  private constructor(axios: AxiosInstance, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initialize = async (axios: AxiosInstance, baseUrl: string) => {
    if (!HttpBoclipsApiClient.instance) {
      const client = new HttpBoclipsApiClient(axios, baseUrl);

      await client.setUpAdminLinks();
      client.setUpControllers();

      HttpBoclipsApiClient.instance = client;
    }

    return HttpBoclipsApiClient.instance;
  };

  private async setUpAdminLinks() {
    const response = await this.axios.get(`${this.baseUrl}/v1/admin`);

    this.adminLinks = AdminLinksConverter.convert(response.data);
  }

  private setUpControllers() {
    this.legalRestrictionsController = new HttpLegalRestrictionsController();
    this.contentPartnersController = new HttpContentPartnersController();
    this.subjectsController = new HttpSubjectsController();
    this.feedsController = new HttpFeedsController();
    this.collectionsController = new HttpCollectionsController();

    [
      this.legalRestrictionsController,
      this.contentPartnersController,
      this.subjectsController,
      this.feedsController,
      this.collectionsController,
    ].forEach(controller => controller.initialize(this.adminLinks, this.axios));
  }
}
