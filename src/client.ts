import { AxiosInstance } from 'axios';
import { LegalRestrictionsConverter } from './converters/LegalRestrictionsConverter';
import { LegalRestrictions } from './LegalRestrictions';

export interface BoclipsApiClient {
  getAllLegalRestrictions(): Promise<LegalRestrictions[]>;
}

export class HttpBoclipsApiClient implements BoclipsApiClient {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async getAllLegalRestrictions(): Promise<LegalRestrictions[]> {
    const response = await this.axios.get('/v1/legal-restrictions');
    return LegalRestrictionsConverter.convert(response.data);
  }
}
