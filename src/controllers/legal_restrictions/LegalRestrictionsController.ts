import { LegalRestrictions } from '../../types/LegalRestrictions';

export interface LegalRestrictionsController {
  getAll(): Promise<LegalRestrictions[]>;
}
