import { Clearable } from '../../common/utils/Clearable';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { ContentPartnerContractsClient } from './ContentPartnerContractsClient';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';

export class FakeContentPartnerContractsClient
  implements ContentPartnerContractsClient, Clearable {
  private contracts = [];

  getAll(page: PageRequest): Promise<Pageable<ContentPartnerContract>> {
    return Promise.resolve({
      page: this.contracts,
      pageSpec: {
        number: page.page,
        size: page.size,
        totalElements: this.contracts.length,
        totalPages: Math.ceil(this.contracts.length / page.size),
      },
    });
  }

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
