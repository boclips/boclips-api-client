import { Projection } from '../../common/model/Projection';
import { UpdateContractRequest } from '../model/UpdateContractRequest';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContractsConverter } from '../ContractsConverter';
import { Contract } from '../model/Contract';
import { ContractsClient } from './ContractsClient';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { PageableConverter } from '../../common/model/PageableConverter';
import { AxiosResponse } from 'axios';

export class ApiContractsClient
  extends ApiSubClient
  implements ContractsClient {
  getAll(
    page: PageRequest,
    projection?: Projection,
  ): Promise<Pageable<Contract>> {
    const contractsLink = this.getLinkOrThrow('contracts');

    return this.axios
      .get(
        expandUrlTemplate(contractsLink.href, {
          page: page.page,
          size: page.size,
          projection: projection,
        }),
      )
      .then(({ data }: AxiosResponse) =>
        PageableConverter.convert(
          data,
          'contracts',
          ContractsConverter.fromResource,
        ),
      );
  }

  create(contract: Omit<Contract, 'id'>): Promise<void> {
    const contractsLink = this.getLinkOrThrow('createContracts');

    return this.axios.post(
      expandUrlTemplate(contractsLink.href, {}),
      ContractsConverter.toRequest(contract),
    );
  }

  public async update(
    id: string,
    updateRequest: UpdateContractRequest,
  ): Promise<void> {
    const contractLink = this.getLinkOrThrow('contract');

    await this.axios.patch(
      expandUrlTemplate(contractLink.href, { id }),
      {
        ...updateRequest,
        contractDates: ContractsConverter.formatDates(
          updateRequest.contractDates,
        ),
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  get(id: string): Promise<Contract> {
    const contractLink = this.getLinkOrThrow('contract');

    return this.axios
      .get(expandUrlTemplate(contractLink.href, { id }))
      .then((response) => ContractsConverter.fromResource(response.data));
  }

  getSignedLink(filename: string): Promise<string> {
    this.axios.interceptors.request.use((request) => {
      return request;
    });

    this.axios.interceptors.response.use((response) => {
      return response;
    });

    const link = this.getLinkOrThrow('createContractsSignedUploadLink').href;

    return this.axios
      .post(link, {
        filename,
      })
      .then((it) => {
        return it.headers.location;
      });
  }
}
