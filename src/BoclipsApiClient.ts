import { AxiosInstance } from 'axios';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import { LegalRestrictions } from './LegalRestrictions';
import { TestBoclipsApiClient } from './TestBoclipsApiClient';

export interface BoclipsApiClient {
  getAllLegalRestrictions(): Promise<LegalRestrictions[]>;
}

let instance = null;

export default {
  getInstance: (): BoclipsApiClient => instance,
  createInstance: (
    environment: string,
    configuredAxios?: AxiosInstance,
  ): BoclipsApiClient => {
    if (environment === 'test') {
      instance = new TestBoclipsApiClient();
    } else {
      instance = new HttpBoclipsApiClient(configuredAxios);
    }
    return instance;
  },
};
