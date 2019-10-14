import ContentPartner from '../../types/ContentPartner';

export interface ContentPartnersController {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
}
