import { LegalRestrictions } from '../../types';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class TestLegalRestrictionsController
  implements LegalRestrictionsController {
  private legalRestrictions: LegalRestrictions[] = [];

  public insertLegalRestrictionsFixture(legalRestrictions: LegalRestrictions) {
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestrictions[]> {
    return Promise.resolve(this.legalRestrictions);
  }
}
