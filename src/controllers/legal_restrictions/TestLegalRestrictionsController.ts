import { randomId } from '../../test_support/utils/idGenerator';
import { LegalRestrictions } from '../../types/LegalRestrictions';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class TestLegalRestrictionsController
  implements LegalRestrictionsController {
  private legalRestrictions: LegalRestrictions[] = [];

  public createLegalRestrictions(text: string) {
    const legalRestrictions: LegalRestrictions = {
      id: randomId(),
      text,
    };
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestrictions[]> {
    return Promise.resolve(this.legalRestrictions);
  }
}
