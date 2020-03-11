import { ContentCategories } from '../model/ContentCategories';
import { ContentPartner } from '../model/ContentPartner';
import { ContentPartnerRequest } from '../model/ContentPartnerRequest';

export interface ContentPartnersClient {
  get(id: string): Promise<ContentPartner>;

  getAll(): Promise<ContentPartner[]>;

  update(id: string, contentPartner: ContentPartnerRequest): Promise<void>;

  create(request: ContentPartnerRequest): Promise<void>;

  getContentCategories(): Promise<ContentCategories>;

  getSignedLink(filename: string): Promise<string>;
}
