import { ContentPartner } from '../model/ContentPartner';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
  update(
    id: string,
    contentPartner: UpdateContentPartnerRequest,
  ): Promise<void>;
}
