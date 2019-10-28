import { ContentPartnerEntity } from '../model/ContentPartnerEntity';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartnerEntity>;
  getAll(): Promise<ContentPartnerEntity[]>;
  update(contentPartner: ContentPartnerEntity): Promise<void>;
}
