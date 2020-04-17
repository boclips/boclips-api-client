import { LegalRestriction } from './model/LegalRestriction';

export class LegalRestrictionsConverter {
  public static convert(response: any): LegalRestriction[] {
    return response._embedded.legalRestrictions.map(({ id, text }: any) => ({
      id,
      text,
    }));
  }
}
