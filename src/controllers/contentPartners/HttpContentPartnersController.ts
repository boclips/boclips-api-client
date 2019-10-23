import { ContentPartnersConverter } from '../../converters/ContentPartnersConverter';
import { ContentPartner } from '../../types';
import expandUrlTemplate from '../../utils/expandUrlTemplate';
import { HttpController } from '../HttpController';
import { ContentPartnersController } from './ContentPartnersController';

export class HttpContentPartnersController extends HttpController
  implements ContentPartnersController {
  public async getAll(): Promise<ContentPartner[]> {
    return this.requestWithAdminLink('contentPartners', async () => {
      const response = await this.axios.get(
        expandUrlTemplate(this.adminLinks.contentPartners.href, {}),
      );
      return ContentPartnersConverter.convertEmbeddedResources(response);
    });
  }

  public async get(id: string): Promise<ContentPartner> {
    return this.requestWithAdminLink('contentPartner', async () => {
      const contentPartnerUrl = expandUrlTemplate(
        this.adminLinks.contentPartner.href,
        { id },
      );

      const response = await this.axios.get(contentPartnerUrl);
      return ContentPartnersConverter.convertResource(response);
    });
  }
  public async update(contentPartner: ContentPartner): Promise<void> {
    if (contentPartner && contentPartner._links && contentPartner._links.self) {
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
    } else {
      throw new Error('Update link not available');
    }
  }
}
