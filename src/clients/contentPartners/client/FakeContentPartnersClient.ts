import { ContentPartnerEntityFactory } from '../../../test-support/ContentPartnersFactory';
import { Clearable } from '../../common/utils/Clearable';
import { ContentPartnerEntity } from '../model/ContentPartnerEntity';
import { ContentPartnersClient } from './ContentPartnersClient';

export class FakeContentPartnersClient
  implements ContentPartnersClient, Clearable {
  private contentPartners: ContentPartnerEntity[] = [];

  public insertContentPartnerFixture(
    contentPartner: Partial<ContentPartnerEntity>,
  ) {
    this.contentPartners.push(
      ContentPartnerEntityFactory.sample(contentPartner),
    );
  }

  public getAll(): Promise<ContentPartnerEntity[]> {
    return Promise.resolve(this.contentPartners);
  }

  public get(id: string): Promise<ContentPartnerEntity> {
    return Promise.resolve(this.contentPartners.find(i => i.id === id));
  }

  public update(contentPartner: ContentPartnerEntity) {
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
