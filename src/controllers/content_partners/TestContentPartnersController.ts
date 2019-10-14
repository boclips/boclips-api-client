import { randomId } from '../../test_support/utils/idGenerator';
import ContentPartner from '../../types/ContentPartner';
import { ContentPartnersController } from './ContentPartnersController';

export class TestContentPartnersController
  implements ContentPartnersController {
  private contentPartners: ContentPartner[];

  public createContentPartner(contentPartner: Partial<ContentPartner>) {
    this.contentPartners.push({
      id: randomId(),
      name: contentPartner.name || 'test content partner name ',
      official: contentPartner.official,
      ageRange: contentPartner.ageRange,
      currency: contentPartner.currency,
      legalRestrictions: contentPartner.legalRestrictions,
      selfLink: contentPartner.selfLink,
      distributionMethods: contentPartner.distributionMethods,
    });
  }

  public getAll(): Promise<ContentPartner[]> {
    return Promise.resolve(this.contentPartners);
  }

  public get(id: string): Promise<ContentPartner> {
    return Promise.resolve(this.contentPartners.find(i => i.id === id));
  }
}
