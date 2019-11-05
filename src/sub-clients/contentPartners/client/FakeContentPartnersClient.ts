import { ContentPartnerFactory } from '../../../test-support';
import { Clearable } from '../../common/utils/Clearable';
import { ContentPartner } from '../model/ContentPartner';
import { UpdateContentPartnerRequest } from '../model/UpdateContentPartnerRequest';
import { ContentPartnersClient } from './ContentPartnersClient';

export class FakeContentPartnersClient
  implements ContentPartnersClient, Clearable {
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

  public update(id: string, contentPartner: UpdateContentPartnerRequest) {
    const index = this.contentPartners.findIndex(i => i.id === id);

    if (index < 0) {
      return Promise.reject();
    }

    const updatedFields: Partial<ContentPartner> = {};

    if (contentPartner.ageRange) {
      const { min, max } = contentPartner.ageRange;
      updatedFields.ageRange = {
        min,
        max,
        label: min ? (max ? `${min}-${max}` : `${min}+`) : '',
      };
    }

    Object.keys(contentPartner).forEach(key => {
      if (key !== 'ageRange') {
        updatedFields[key] = contentPartner[key];
      }
    });

    this.contentPartners[index] = {
      ...this.contentPartners[index],
      ...updatedFields,
    };

    return Promise.resolve();
  }

  public clear() {
    this.contentPartners = [];
  }
}
