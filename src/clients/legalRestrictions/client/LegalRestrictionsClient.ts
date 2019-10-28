import { LegalRestrictionsEntity } from '../model/LegalRestrictionsEntity';

export interface LegalRestrictionsClient {
  getAll(): Promise<LegalRestrictionsEntity[]>;
}
