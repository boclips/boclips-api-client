import { LegalRestrictions } from '../../types/LegalRestrictions';
import { LegalRestrictionsController } from './LegalRestrictionsController';

export class TestLegalRestrictionsController
  implements LegalRestrictionsController {
  private randomId = (): string =>
    `${Math.floor((Math.random() * 100000) % 100000)}`;

  private legalRestrictions: LegalRestrictions[] = [];

  public createLegalRestrictions(text: string) {
    const legalRestrictions: LegalRestrictions = {
      id: this.randomId(),
      text,
    };
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<LegalRestrictions[]> {
    return Promise.resolve(this.legalRestrictions);
  }
}
