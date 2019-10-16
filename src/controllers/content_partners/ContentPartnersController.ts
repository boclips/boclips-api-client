import { ContentPartner } from '../../types';

export interface ContentPartnersController {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
}
