import Pageable from '../../common/model/Pageable';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { PageRequest } from '../../common/model/PageRequest';
import { ContentPartnerContractRequest } from '../requests/ContentPartnerContractRequest';

export interface ContentPartnerContractsClient {
  get(id: string): Promise<ContentPartnerContract>;

  getAll(page: PageRequest): Promise<Pageable<ContentPartnerContract>>;

  create(request: Omit<ContentPartnerContract, 'id'>): Promise<void>;

  update(id: string, contractUpdate: ContentPartnerContractRequest);

  getSignedLink(filename: string): Promise<string>;
}
