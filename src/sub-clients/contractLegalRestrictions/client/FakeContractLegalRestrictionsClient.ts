import { Clearable } from '../../common/utils/Clearable';
import { ContractLegalRestriction } from '../model/ContractLegalRestriction';
import { ContractLegalRestrictionsClient } from './ContractLegalRestrictionsClient';

export class FakeContractLegalRestrictionsClient
  implements ContractLegalRestrictionsClient, Clearable {
  private legalRestrictions: ContractLegalRestriction[] = [];

  public insertLegalRestrictionsFixture(
    legalRestrictions: ContractLegalRestriction,
  ) {
    this.legalRestrictions.push(legalRestrictions);
  }

  public getAll(): Promise<ContractLegalRestriction[]> {
    return Promise.resolve(this.legalRestrictions);
  }

  public clear() {
    this.legalRestrictions = [];
  }
}
