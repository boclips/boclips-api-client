import { Channel } from '../../channels/model/Channel';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { Projection } from '../../common/model/Projection';
import { Clearable } from '../../common/utils/Clearable';
import { Contract } from '../model/Contract';
import { UpdateContractRequest } from '../model/UpdateContractRequest';
import { ContractsClient } from './ContractsClient';

export class FakeContractsClient implements ContractsClient, Clearable {
  private contracts: Contract[] = [];

  getAll(
    page: PageRequest,
    projection?: Projection,
  ): Promise<Pageable<Contract>> {
    return Promise.resolve({
      page:
        projection === Projection.LIST
          ? this.contracts.map(full => ({
              id: full.id,
              contentPartnerName: full.contentPartnerName,
            }))
          : this.contracts,
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

  public update(id: string, contractUpdate: UpdateContractRequest) {
    const index = this.contracts.findIndex(i => i.id === id);

    if (index < 0) {
      return Promise.reject();
    }

    const updatedFields: Partial<Channel> = {};

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

  get(): Promise<Contract> {
    if (this.contracts[0]) {
      return Promise.resolve(this.contracts[0]);
    } else {
      throw new Error(
        'No content partner contracts have been set on the FakeContractsClient',
      );
    }
  }

  insertFixture(contract: Contract) {
    this.contracts.push(contract);
  }

  getSignedLink(filename: string): Promise<string> {
    const newFilename = filename.replace('.', '_') + '_signed_link';
    const signedLinkUrl = `http://www.server.com/${newFilename}`;
    return new Promise(resolve => resolve(signedLinkUrl));
  }
}
