import { ContentPartner, ContentPartnerFactory } from '../../types';
import { ContentPartnersController } from './ContentPartnersController';

export class TestContentPartnersController
  implements ContentPartnersController {
  private contentPartners: ContentPartner[];

  public insertContentPartnerFixture(contentPartner: Partial<ContentPartner>) {
    this.contentPartners.push(ContentPartnerFactory.sample(contentPartner));
  }

  public getAll(): Promise<ContentPartner[]> {
    return Promise.resolve(this.contentPartners);
  }

  public get(id: string): Promise<ContentPartner> {
    return Promise.resolve(this.contentPartners.find(i => i.id === id));
  }
}
