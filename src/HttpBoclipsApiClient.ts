import { AxiosInstance } from 'axios';
import { BoclipsApiClient } from './BoclipsApiClient';
import { LegalRestrictionsConverter } from './converters/LegalRestrictionsConverter';
import BackofficeLinks from './types/BackofficeLinks';
import { LegalRestrictions } from './types/LegalRestrictions';

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;
  private backofficeLinks: BackofficeLinks;

  private constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public static initalize = async (axios: AxiosInstance) => {
    const instance = new HttpBoclipsApiClient(axios);

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
    this.backofficeLinks = await this.axios.get('/v1/admin');
  }
}
