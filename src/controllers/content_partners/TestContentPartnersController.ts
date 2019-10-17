import { ContentPartner, ContentPartnerFactory } from '../../types';
import { Clearable } from '../../utils/Clearable';
import { ContentPartnersController } from './ContentPartnersController';

export class TestContentPartnersController
  implements ContentPartnersController, Clearable {
  private contentPartners: ContentPartner[] = [];

  public insertContentPartnerFixture(contentPartner: Partial<ContentPartner>) {
    this.contentPartners.push(ContentPartnerFactory.sample(contentPartner));
  }

  public getAll(): Promise<ContentPartner[]> {
    return Promise.resolve(this.contentPartners);
  }

  public get(id: string): Promise<ContentPartner> {
    return Promise.resolve(this.contentPartners.find(i => i.id === id));
  }

  public update(contentPartner: ContentPartner) {
    const index = this.contentPartners.findIndex(
      i => i.id === contentPartner.id,
    );

    if (index < 0) {
      return Promise.reject();
    }

    this.contentPartners[index] = contentPartner;

    return Promise.resolve();
  }

  public clear() {
    this.contentPartners = [];
  }
}
