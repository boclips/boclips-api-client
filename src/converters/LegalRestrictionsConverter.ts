import { LegalRestrictions } from '../types/LegalRestrictions';

export class LegalRestrictionsConverter {
  public static convert(response: any): LegalRestrictions[] {
    return response._embedded.legalRestrictions.map(item => {
      const { id, text } = item;
      return { id, text };
    });
  }
}
