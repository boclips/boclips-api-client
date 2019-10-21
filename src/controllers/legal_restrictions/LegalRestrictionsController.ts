import { LegalRestrictions } from '../../types';

export interface LegalRestrictionsController {
  getAll(): Promise<LegalRestrictions[]>;
}
