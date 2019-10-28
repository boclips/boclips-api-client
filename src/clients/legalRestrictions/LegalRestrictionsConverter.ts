import { LegalRestrictionsEntity } from './model/LegalRestrictionsEntity';

export class LegalRestrictionsConverter {
  public static convert(response: any): LegalRestrictionsEntity[] {
    return response._embedded.legalRestrictions.map(item => {
      const { id, text } = item;
      return { id, text };
    });
  }
}
