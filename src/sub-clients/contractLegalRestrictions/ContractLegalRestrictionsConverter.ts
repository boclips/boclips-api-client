import { ContractLegalRestriction } from './model/ContractLegalRestriction';

export class ContractLegalRestrictionsConverter {
  public static convert(response: any): ContractLegalRestriction[] {
    return response.data._embedded.restrictions.map(restrictions => ({
      id: restrictions.id,
      text: restrictions.text,
    }));
  }
}
