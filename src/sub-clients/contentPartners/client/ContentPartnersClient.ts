import { ContentPartner } from '../model/ContentPartner';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';
import { ContentPartnerRequest } from './../model/ContentPartnerRequest';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;
  getAll(): Promise<ContentPartner[]>;
  update(
    id: string,
    contentPartner: UpdateContentPartnerRequest,
  ): Promise<void>;
  create(request: ContentPartnerRequest): Promise<void>;
}
