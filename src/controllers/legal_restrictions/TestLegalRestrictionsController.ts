import { LegalRestrictions } from '../../types';
import { Clearable } from '../../utils/Clearable';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class TestLegalRestrictionsController
  implements LegalRestrictionsController, Clearable {
  private legalRestrictions: LegalRestrictions[] = [];

  public insertLegalRestrictionsFixture(legalRestrictions: LegalRestrictions) {
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestrictions[]> {
    return Promise.resolve(this.legalRestrictions);
  }

  public clear() {
    this.legalRestrictions = [];
  }
}
