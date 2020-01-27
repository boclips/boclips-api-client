import { Clearable } from '../../common/utils/Clearable';
import { LegalRestriction } from '../model/LegalRestriction';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class FakeLegalRestrictionsClient
  implements LegalRestrictionsClient, Clearable {
  private legalRestrictions: LegalRestriction[] = [];

  public insertLegalRestrictionsFixture(legalRestrictions: LegalRestriction) {
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestriction[]> {
    return Promise.resolve(this.legalRestrictions);
  }

  public clear() {
    this.legalRestrictions = [];
  }
}
