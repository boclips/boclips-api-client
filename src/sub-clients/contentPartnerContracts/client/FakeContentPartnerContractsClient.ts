import { Clearable } from '../../common/utils/Clearable';
import { ContentPartner } from '../../contentPartners/model/ContentPartner';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { ContentPartnerContractsClient } from './ContentPartnerContractsClient';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';

export class FakeContentPartnerContractsClient
  implements ContentPartnerContractsClient, Clearable {
  private contracts: ContentPartnerContract[] = [];

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

  public update(
    id: string,
    contractUpdate: Omit<ContentPartnerContract, 'id'>,
  ) {
    const index = this.contracts.findIndex(i => i.id === id);

    if (index < 0) {
      return Promise.reject();
    }

    const updatedFields: Partial<ContentPartner> = {};

    Object.keys(contractUpdate).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      updatedFields[key] = contractUpdate[key];
    });

    this.contracts[index] = {
      ...this.contracts[index],
      ...updatedFields,
    };

    return Promise.resolve();
  }

  get(): Promise<ContentPartnerContract> {
    if (this.contracts[0]) {
      return Promise.resolve(this.contracts[0]);
    } else {
      throw new Error(
        'No content partner contracts have been set on the FakeContentPartnerContractsClient',
      );
    }
  }

  insertContentPartnerContractFixture(contract: ContentPartnerContract) {
    this.contracts = [contract];
  }

  getSignedLink(filename: string): Promise<string> {
    const newFilename = filename.replace('.', '_') + '_signed_link';
    const signedLinkUrl = `http://www.server.com/${newFilename}`;
    return new Promise(resolve => resolve(signedLinkUrl));
  }
}
