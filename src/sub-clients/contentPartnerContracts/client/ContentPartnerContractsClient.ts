import { UpdateContractRequest } from './../model/UpdateContractRequest';
import Pageable from '../../common/model/Pageable';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import { PageRequest } from '../../common/model/PageRequest';

export interface ContentPartnerContractsClient {
  get(id: string): Promise<ContentPartnerContract>;

  getAll(page: PageRequest): Promise<Pageable<ContentPartnerContract>>;

  create(request: Omit<ContentPartnerContract, 'id'>): Promise<void>;

  update(id: string, udpateRequest: UpdateContractRequest): Promise<void>;

  getSignedLink(filename: string): Promise<string>;
}
