import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ContractLegalRestrictionsConverter } from '../ContractLegalRestrictionsConverter';
import { ContractLegalRestriction } from '../model/ContractLegalRestriction';
import { ContractLegalRestrictionsClient } from './ContractLegalRestrictionsClient';

export class ApiContractLegalRestrictionsClient extends ApiSubClient
  implements ContractLegalRestrictionsClient {
  public async getAll(): Promise<ContractLegalRestriction[]> {
    const contractLegalRestrictions = this.getLinkOrThrow(
      'contractLegalRestrictions',
    );

    return this.axios
      .get(contractLegalRestrictions.href)
      .then(it => ContractLegalRestrictionsConverter.convert(it));
  }
}
