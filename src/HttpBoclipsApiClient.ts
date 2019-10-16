import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { HttpContentPartnersController } from './controllers/content_partners/HttpContentPartnersController';
import { HttpLegalRestrictionsController } from './controllers/legal_restrictions/HttpLegalRestrictionsController';
import { BackofficeLinksConverter } from './converters/BackofficeLinksConverter';
import { BackofficeLinks } from './types';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;
  private backofficeLinks: BackofficeLinks;

  public legalRestrictionsController: HttpLegalRestrictionsController;
  public contentPartnersController: HttpContentPartnersController;

  private constructor(axios: AxiosInstance, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initalize = async (axios: AxiosInstance, baseUrl: string) => {
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
  }
}
