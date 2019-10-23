import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpContentPartnersController } from './controllers/contentPartners/HttpContentPartnersController';
import { HttpFeedsController } from './controllers/httpFeeds/HttpFeedsController';
import { HttpLegalRestrictionsController } from './controllers/legalRestrictions/HttpLegalRestrictionsController';
import { HttpSubjectsController } from './controllers/subjects/HttpSubjectsController';
import { BackofficeLinksConverter } from './converters/BackofficeLinksConverter';
import { BackofficeLinks } from './types';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;
  private backofficeLinks: BackofficeLinks;

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

    await instance.setBackofficeLinks();

    return instance;
  };

  private async setBackofficeLinks() {
    const backofficeLinksResponse = await this.axios.get(
      `${this.baseUrl}/v1/admin`,
    );

    this.backofficeLinks = BackofficeLinksConverter.convert(
      backofficeLinksResponse.data,
    );

    this.legalRestrictionsController = new HttpLegalRestrictionsController(
      this.backofficeLinks,
      this.axios,
    );

    this.contentPartnersController = new HttpContentPartnersController(
      this.backofficeLinks,
      this.axios,
    );

    this.subjectsController = new HttpSubjectsController(
      this.backofficeLinks,
      this.axios,
    );

    this.feedsController = new HttpFeedsController(
      this.backofficeLinks,
      this.axios,
    );
  }
}
