import { ApiClient } from '../../common/client/ApiClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnersConverter } from '../ContentPartnersConverter';
import { ContentPartnerEntity } from '../model/ContentPartnerEntity';
import { ContentPartnersClient } from './ContentPartnersClient';

export class ApiContentPartnersClient extends ApiClient
  implements ContentPartnersClient {
  public async getAll(): Promise<ContentPartnerEntity[]> {
    const contentPartnersLink = this.getLinkOrThrow('contentPartners');

    return this.axios
      .get(expandUrlTemplate(contentPartnersLink.href, {}))
      .then(ContentPartnersConverter.convertEmbeddedResources);
  }

  public async get(id: string): Promise<ContentPartnerEntity> {
    const contentPartnerLink = this.getLinkOrThrow('contentPartner');

    return this.axios
      .get(expandUrlTemplate(contentPartnerLink.href, { id }))
      .then(ContentPartnersConverter.convertResource);
  }

  public async update(contentPartner: ContentPartnerEntity): Promise<void> {
    const validSelfLink =
      contentPartner && contentPartner._links && contentPartner._links.self;

    if (!validSelfLink) {
      throw new Error('Update content partner is not available');
    }

    await this.axios.put(
      contentPartner._links.self.href,
      {
        ageRange: contentPartner.ageRange,
        name: contentPartner.name,
        legalRestrictions: contentPartner.legalRestrictions,
        distributionMethods: contentPartner.distributionMethods,
        currency: contentPartner.currency,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }
}
