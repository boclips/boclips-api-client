import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpContentPartnersController } from './controllers/contentPartners/HttpContentPartnersController';
import { HttpFeedsController } from './controllers/httpFeeds/HttpFeedsController';
import { HttpLegalRestrictionsController } from './controllers/legalRestrictions/HttpLegalRestrictionsController';
import { HttpSubjectsController } from './controllers/subjects/HttpSubjectsController';
import { AdminLinksConverter } from './converters/AdminLinksConverter';
import { AdminLinks } from './types';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;
  private adminLinks: AdminLinks;

  public legalRestrictionsController: HttpLegalRestrictionsController;
  public contentPartnersController: HttpContentPartnersController;
  public subjectsController: HttpSubjectsController;
  public feedsController: HttpFeedsController;

  private constructor(axios: AxiosInstance, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initialize = async (axios: AxiosInstance, baseUrl: string) => {
    const instance = new HttpBoclipsApiClient(axios, baseUrl);

    await instance.setUpAdminLinks();
    instance.setUpControllers();

    return instance;
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

    [
      this.legalRestrictionsController,
      this.contentPartnersController,
      this.subjectsController,
      this.feedsController,
    ].forEach(controller => controller.initialize(this.adminLinks, this.axios));
  }
}
