import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnerContractsConverter } from '../ContentPartnerContractsConverter';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { ContentPartnerContractsClient } from './ContentPartnerContractsClient';
import Pageable from '../../common/model/Pageable';
import { PageRequest } from '../../common/model/PageRequest';
import { PageableConverter } from '../../common/model/PageableConverter';
import { AxiosResponse } from 'axios';

export class ApiContentPartnerContractsClient extends ApiSubClient
  implements ContentPartnerContractsClient {
  getAll(page: PageRequest): Promise<Pageable<ContentPartnerContract>> {
    const contentPartnerContractsLink = this.getLinkOrThrow(
      'contentPartnerContracts',
    );

    return this.axios
      .get(
        expandUrlTemplate(contentPartnerContractsLink.href, {
          page: page.page,
          size: page.size,
        }),
      )
      .then(({ data }: AxiosResponse) =>
        PageableConverter.convert(
          data,
          'contracts',
          ContentPartnerContractsConverter.fromResource,
        ),
      );
  }

  create(contract: Omit<ContentPartnerContract, 'id'>): Promise<void> {
    const contentPartnerContractsLink = this.getLinkOrThrow(
      'createContentPartnerContracts',
    );

    return this.axios.post(
      expandUrlTemplate(contentPartnerContractsLink.href, {}),
      ContentPartnerContractsConverter.toRequest(contract),
    );
  }

  get(id: string): Promise<ContentPartnerContract> {
    const contentPartnerContractLink = this.getLinkOrThrow(
      'contentPartnerContract',
    );

    return this.axios
      .get(expandUrlTemplate(contentPartnerContractLink.href, { id }))
      .then(response =>
        ContentPartnerContractsConverter.fromResource(response.data),
      );
  }

  getSignedLink(filename: string): Promise<string> {
    this.axios.interceptors.request.use(request => {
      console.log('Starting Request', request);
      return request;
    });

    this.axios.interceptors.response.use(response => {
      console.log('Response:', response);
      return response;
    });

    const link = this.getLinkOrThrow(
      'createContentPartnerContractsSignedUploadLink',
    ).href;
    console.log(link);
    return this.axios
      .post(link, {
        filename,
      })
      .then(it => {
        return it.headers.location;
      });
  }
}
