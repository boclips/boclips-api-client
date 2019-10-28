import { Clearable } from '../../common/utils/Clearable';
import { LegalRestrictionsEntity } from '../model/LegalRestrictionsEntity';
import { LegalRestrictionsClient } from './LegalRestrictionsClient';

export class FakeLegalRestrictionsClient
  implements LegalRestrictionsClient, Clearable {
  private legalRestrictions: LegalRestrictionsEntity[] = [];

  public insertLegalRestrictionsFixture(
    legalRestrictions: LegalRestrictionsEntity,
  ) {
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestrictionsEntity[]> {
    return Promise.resolve(this.legalRestrictions);
  }

  public clear() {
    this.legalRestrictions = [];
  }
}
