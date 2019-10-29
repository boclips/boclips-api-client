import { ContentPartner } from '../model/ContentPartner';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
  update(contentPartner: ContentPartner): Promise<void>;
}
