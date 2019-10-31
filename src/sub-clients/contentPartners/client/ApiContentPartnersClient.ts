import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ContentPartnersConverter } from '../ContentPartnersConverter';
import { ContentPartner } from '../model/ContentPartner';
import { ContentPartnersClient } from './ContentPartnersClient';

export class ApiContentPartnersClient extends ApiSubClient
  implements ContentPartnersClient {
  public async getAll(): Promise<ContentPartner[]> {
    const contentPartnersLink = this.getLinkOrThrow('contentPartners');

    return this.axios
      .get(expandUrlTemplate(contentPartnersLink.href, {}))
      .then(ContentPartnersConverter.convertEmbeddedResources);
  }

  public async get(id: string): Promise<ContentPartner> {
    const contentPartnerLink = this.getLinkOrThrow('contentPartner');

    return this.axios
      .get(expandUrlTemplate(contentPartnerLink.href, { id }))
      .then(ContentPartnersConverter.convertResource);
  }

  public async update(contentPartner: ContentPartner): Promise<void> {
    const validSelfLink =
      contentPartner && contentPartner.links && contentPartner.links.self;

    if (!validSelfLink) {
      throw new Error('Update content partner is not available');
    }

    await this.axios.put(
      contentPartner.links.self.getOriginalLink(),
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
