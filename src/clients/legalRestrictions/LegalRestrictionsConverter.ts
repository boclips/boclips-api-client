import { LegalRestrictions } from './model/LegalRestrictions';

export class LegalRestrictionsConverter {
  public static convert(response: any): LegalRestrictions[] {
    return response._embedded.legalRestrictions.map(({ id, text }) => ({
      id,
      text,
    }));
  }
}
