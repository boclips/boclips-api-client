import { LegalRestrictions } from './types/LegalRestrictions';

export interface BoclipsApiClient {
  getAllLegalRestrictions(): Promise<LegalRestrictions[]>;
}
