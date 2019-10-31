import { Clearable } from '../../common/utils/Clearable';
import { LegalRestrictions } from '../model/LegalRestrictions';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class FakeLegalRestrictionsClient
  implements LegalRestrictionsClient, Clearable {
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
