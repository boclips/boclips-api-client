import { ContentCategories } from '../model/ContentCategories';
import { ContentPartner } from '../model/ContentPartner';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;

  getAll(): Promise<ContentPartner[]>;

  update(
    id: string,
    contentPartner: UpdateContentPartnerRequest,
  ): Promise<void>;

  create(request: ContentPartnerRequest): Promise<void>;

  getContentCategories(): Promise<ContentCategories>;

  getSignedLink(filename: string): Promise<string>;
}
