import { BoclipsApiClient } from './BoclipsApiClient';
import { LegalRestrictions } from './types/LegalRestrictions';

const randomId = (): string =>
  `${Math.floor((Math.random() * 100000) % 100000)}`;

export class TestBoclipsApiClient implements BoclipsApiClient {
  private legalRestrictions: LegalRestrictions[] = [];

  public createLegalRestrictions(text: string) {
    const legalRestrictions: LegalRestrictions = {
      id: randomId(),
      text,
    };
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAllLegalRestrictions(): Promise<LegalRestrictions[]> {
    return Promise.resolve(this.legalRestrictions);
  }
}
