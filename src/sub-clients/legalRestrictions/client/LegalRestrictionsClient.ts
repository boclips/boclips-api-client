import { LegalRestriction } from '../model/LegalRestriction';

export interface LegalRestrictionsClient {
  getAll(): Promise<LegalRestriction[]>;
}
