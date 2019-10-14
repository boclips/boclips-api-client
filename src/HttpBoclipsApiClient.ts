import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { BackofficeLinksConverter } from './converters/BackofficeLinksConverter';
import { LegalRestrictionsConverter } from './converters/LegalRestrictionsConverter';
import BackofficeLinks from './types/BackofficeLinks';
import { LegalRestrictions } from './types/LegalRestrictions';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;
  private backofficeLinks: BackofficeLinks;

  private constructor(axios: AxiosInstance, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  public static initalize = async (axios: AxiosInstance, baseUrl: string) => {
    const instance = new HttpBoclipsApiClient(axios, baseUrl);

    await instance.setBackofficeLinks();

    return instance;
  };

  public async getAllLegalRestrictions(): Promise<LegalRestrictions[]> {
    if (this.backofficeLinks && this.backofficeLinks.legalRestrictions) {
      const response = await this.axios.get(
        this.backofficeLinks.legalRestrictions.href,
      );
      return LegalRestrictionsConverter.convert(response.data);
    } else {
      throw new Error('Not authorized for method');
    }
  }

  private async setBackofficeLinks() {
    const backofficeLinksResponse = await this.axios.get(
      `${this.baseUrl}/v1/admin`,
    );
    this.backofficeLinks = BackofficeLinksConverter.convert(
      backofficeLinksResponse.data,
    );
  }
}
