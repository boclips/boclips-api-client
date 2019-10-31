import { LegalRestrictions } from '../model/LegalRestrictions';

export interface LegalRestrictionsClient {
  getAll(): Promise<LegalRestrictions[]>;
}
