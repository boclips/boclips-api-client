import { Clearable } from '../../common/utils/Clearable';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { ContentPartnerContractsClient } from './ContentPartnerContractsClient';

export class FakeContentPartnerContractsClient
  implements ContentPartnerContractsClient, Clearable {
  private contracts = [];

  clear() {
    this.contracts = [];
  }

  create(): Promise<void> {
    return Promise.resolve();
  }

  get(): Promise<ContentPartnerContract> {
    if (this.contracts[0]) {
      return this.contracts[0];
    } else {
      throw new Error(
        'No content partner contracts have been set on the FakeContentPartnerContractsClient',
      );
    }
  }

  insertContentPartnerContractFixture(contract: ContentPartnerContract) {
    this.contracts = [contract];
  }
}
