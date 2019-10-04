import { LegalRestrictions } from './LegalRestrictions';

export interface BoclipsApiClient {
  getAllLegalRestrictions(): Promise<LegalRestrictions[]>;
}
