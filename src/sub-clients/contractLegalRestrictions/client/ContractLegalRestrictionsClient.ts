import { ContractLegalRestriction } from '../model/ContractLegalRestriction';

export interface ContractLegalRestrictionsClient {
  getAll(): Promise<ContractLegalRestriction[]>;
}
