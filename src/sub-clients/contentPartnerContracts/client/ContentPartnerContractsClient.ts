import { PageRequest } from './../../common/model/PageRequest';
import { ContentPartnerContract } from '../model/ContentPartnerContract';
import Pageable from '../../common/model/Pageable';

export interface ContentPartnerContractsClient {
  get(id: string): Promise<ContentPartnerContract>;
  getAll(page: PageRequest): Promise<Pageable<ContentPartnerContract>>;
  create(request: Omit<ContentPartnerContract, 'id'>): Promise<void>;
}
