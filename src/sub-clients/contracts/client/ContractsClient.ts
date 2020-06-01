import { UpdateContractRequest } from '../model/UpdateContractRequest';
import Pageable from '../../common/model/Pageable';
import { Contract } from '../model/Contract';
import { PageRequest } from '../../common/model/PageRequest';

export interface ContractsClient {
  get(id: string): Promise<Contract>;

  getAll(page: PageRequest): Promise<Pageable<Contract>>;

  create(request: Omit<Contract, 'id'>): Promise<void>;

  update(id: string, udpateRequest: UpdateContractRequest): Promise<void>;

  getSignedLink(filename: string): Promise<string>;
}
