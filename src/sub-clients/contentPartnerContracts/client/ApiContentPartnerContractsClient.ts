import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnerContractsConverter } from '../ContentPartnerContractsConverter';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { ContentPartnerContractsClient } from './ContentPartnerContractsClient';

export class ApiContentPartnerContractsClient extends ApiSubClient
  implements ContentPartnerContractsClient {
  create(contract: Omit<ContentPartnerContract, 'id'>): Promise<void> {
    const contentPartnerContractsLink = this.getLinkOrThrow(
      'contentPartnerContracts',
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
}
